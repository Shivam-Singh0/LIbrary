
from django.urls import path
from base import views


urlpatterns = [
    path('books_list/', views.getBooks, name='books_list'),
    path('bookCreate/', views.createBook, name='books_create'),
    path('bookDetail/<str:pk>/', views.getBookById, name='books_detail'),
    path('bookDel/<str:pk>/', views.delBook, name='book_del'),
    path('bookEdit/<str:pk>/', views.editBook, name='book_edit'),
    path('matchingBooks/<str:pk>/', views.getMatchingBooks, name='book_match'),


]
