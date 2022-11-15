
from django.urls import path
from base import user_views as views


urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token-obtain_pair'),
    path('register/', views.registerUser, name='user-register'),
    path('list/', views.getUsersList, name='users-list'),
    path('del/<str:pk>/', views.delUser, name='users-del'),

]
