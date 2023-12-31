from django.urls import path
from . import views
urlpatterns = [
    path("", views.index, name = "index"),
    path("login", views.login_view, name = "login_view"),
    path("logout", views.logout_view, name = "logout_view"),
    path("register", views.register, name = "register"),
    path("books",views.create_book, name="create_book"),
    path("<str:username>/<str:book_name>", views.book_content, name="book_content"),
    path("<str:username>/<str:book_name>/<int:page_number>", views.page_view, name="page_view")
]