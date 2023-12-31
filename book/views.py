import json
from django.http import HttpResponseRedirect, JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from django.shortcuts import render
from django.db import IntegrityError
from django.contrib.auth.decorators import login_required
from .models import User, Page, Book, Word

# Create your views here.

def index(request):
    user = request.user
    books = None
    if user.is_authenticated: 
        books = Book.objects.filter(user = user).order_by('-updated_at')
        return render(request, "book/index.html",{
        "user":user,
        "books":books,
        })
    else:
        return render(request,"book/login.html")

        

@login_required
def create_book(request):
    if request.method == 'POST':
        user = request.user
        name = request.POST["name"]
        books = Book.objects.filter(user = user)
        if len(Book.objects.filter(user = user, name = name))>0:
            return render(request, "book/index.html", {
                "message":"There is a book with this name",
                "books":books
            })
        link_name = '-'.join(str(name).split(' '))
        language = request.POST["language"]
        words_per_page = request.POST["words"]
        cover_color = str(request.POST["color"])
        if cover_color == '#FFEF00' or cover_color == '#FFFFFF' or cover_color =='FC59D3':
            font_color = '#000000'
        else:
            font_color = '#FFFFFF'
        book = Book.objects.create(user = user, name = name, link_name = link_name, language = language, words_per_page = words_per_page, cover_color = cover_color, font_color = font_color)
        book.save()
        page = Page.objects.create(book=book, number=1, edit_mode = True, first_save_done = False)
        page.save()
        words_per_page  = int(book.words_per_page)
        for i in range (words_per_page): 
            word = Word.objects.create(page=page, word = "example", meaning = "ornek",repeated=1,remembered=False)
            word.save()
        return HttpResponseRedirect(reverse('index'))
    else:
        return JsonResponse({"message":"You should send POST request to create book"})
        
@login_required
def book_content(request,username,book_name):
    user = request.user 
    book = Book.objects.filter(user = user,link_name = book_name).first()
    pages = Page.objects.filter(book = book)
    if request.method == 'POST':
        number = 1+len(Page.objects.filter(book = book))
        new_page = Page.objects.create(book = book, number = number, edit_mode = True, first_save_done = False)
        words_per_page  = int(book.words_per_page)
        for i in range (words_per_page): 
            word = Word.objects.create(page=new_page,word = "example", meaning = "ornek",repeated=1,remembered=False)
            word.save()
        new_page.save()
    return render(request, "book/book.html",{
        "pages":pages,
        "book":book,
    })

def page_view(request,username,book_name,page_number):
    book = Book.objects.filter(link_name = book_name).first()
    page = Page.objects.filter(book = book, number = page_number).first()
    words = Word.objects.filter(page = page,remembered = False)
    if request.method == 'PUT':
        if page.first_save_done == False and page.edit_mode == True:
            data = json.loads(request.body)
            index = 0
            for word in words:
                word.word = data[index].get('word')
                word.meaning = data[index].get('meaning')
                index += 1
                word.save()
            page.first_save_done = True
            page.save()
            page.edit_mode = False
            page.save()
            return JsonResponse({"message":"Words saved successfully"})
        elif page.first_save_done == True and page.edit_mode == True:
            data = json.loads(request.body)
            index = 0
            for word in words:
                word.word = data[index].get('word')
                word.meaning = data[index].get('meaning')
                index += 1
                word.save()
            page.first_save_done = True
            page.save()
            page.edit_mode = False
            page.save()
            return JsonResponse({"message":"Words saved successfully"})
        else:
            data = json.loads(request.body)
            for index in range (0,len(data)):
                new_word = Word.objects.filter(page=page,word = data[index].get('word'), meaning = data[index].get('meaning')).first()
                new_word.remembered = True
                new_word.save()
            for word in words:
                word.repeated+=1
                word.save()
            page.edit_mode = True 
            page.save()
            return JsonResponse({"message":"Unforgotten words has been deleted"})
    words = Word.objects.filter(page = page,remembered = False)
    remembered_words = Word.objects.filter(page=page, remembered = True).order_by('-repeated')
    if len(remembered_words) == book.words_per_page:
        page.finished = True
        page.save()
    return render(request, "book/page.html",{
        "words": words,
        "page":page,
        "book":book,
        "word_amount":len(words),
        "remembered_words":remembered_words,
    })

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