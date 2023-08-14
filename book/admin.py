from django.contrib import admin
from . models import Book, Page, Word, User 
# Register your models here.

admin.site.register(Book)
admin.site.register(Page)
admin.site.register(Word)
admin.site.register(User)