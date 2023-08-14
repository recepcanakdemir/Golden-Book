from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import MinLengthValidator, MaxLengthValidator

# Create your models here.
class User(AbstractUser):
    pass

class Book(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE, null=False,related_name="user")
    name = models.CharField(max_length=200, null=True)
    language = models.CharField(max_length=200, null=True)

    def __str__(self):
        return self.name

class Page(models.Model):
    number = models.IntegerField(blank=True,null=True)
    book = models.ForeignKey(Book, on_delete=models.CASCADE, null=False, related_name="book")

class Word(models.Model):
    word = models.CharField(max_length=200, null = True)
    meaning = models.CharField(max_length=200, null=True)
    page = models.ForeignKey(Page, on_delete=models.CASCADE, null = False,  related_name="page")

    def __str__(self):
        return self.word