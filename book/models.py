from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import MinLengthValidator, MaxLengthValidator

# Create your models here.
class User(AbstractUser):
    pass

class Book(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE, null=False,related_name="user")
    name = models.CharField(max_length=200, null=True)
    link_name = models.CharField(max_length=250,null=True)
    language = models.CharField(max_length=200, null=True)
    words_per_page = models.IntegerField(blank=True, null=True)
    cover_color = models.CharField(max_length=200,null=True)
    font_color = models.CharField(max_length=200,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def serialize(self):
        return {
            "id":self.pk,
            "user":self.user,
            "name":self.name.split,
            "link_name":'-'.join(self.name.split(' ')),
            "created":self.created_at.strftime("%b %d %Y, %I:%M %p"),
            "updated":self.updated_at.strftime("%b %d %Y, %I:%M %p"),
            "words_per_page":self.words_per_page,
            "cover_color":self.cover_color,
            "font_color":self.font_color,
        }

    def __str__(self):
        return self.name

class Page(models.Model):
    number = models.IntegerField(blank=True,null=True)
    book = models.ForeignKey(Book, on_delete=models.CASCADE, null=False, related_name="book")
    edit_mode = models.BooleanField(default=True)
    first_save_done = models.BooleanField(default=False)
    start_number = models.IntegerField(blank=True,null=True)

    def __str__(self):
        return f"{self.book.name} , {self.number}"

class Word(models.Model):
    word = models.CharField(max_length=200, null = True)
    meaning = models.CharField(max_length=200, null=True)
    page = models.ForeignKey(Page, on_delete=models.CASCADE, null = False,  related_name="page")
    remembered = models.BooleanField()
    number = models.IntegerField(blank=True,null=True)
    repeated = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.word