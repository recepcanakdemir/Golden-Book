from django.http import HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from django.shortcuts import render
from django.db import IntegrityError
from .models import User, Page, Book, Word
# Create your views here.
def index(request):
    user = request.user
    return render(request, "book/index.html",{
        "user":user,
    })

def book_content(request,username,book_id):
    pass

def login_view(request):
    if request.method == 'POST':

        #Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username = username, password = password)  

        #Check if authentication successful
        if user is not None:
            login(request,user)
            return HttpResponseRedirect(reverse('index'))
        else:
            return render(request, "book/login.html",{
                "message": "Invalid username and/or password."
            })
    else:
        return render(request,"book/login.html")

def register(request):
    if request.method == 'POST':
        username = request.POST["username"]
        email = request.POST["email"]

        #Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "book/register.html",{
                "message":"Passwords must match"
            })
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "book/register.html", {
                "message":"Username is already taken"
            })
        login(request,user)
        return HttpResponseRedirect(reverse('index')) 
    else:
        return render(request,"book/register.html")

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse('index'))