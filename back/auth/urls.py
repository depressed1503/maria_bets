from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter
from . import views


router = DefaultRouter()
router.register(r'users', views.CustomUserViewSet)

urlpatterns = [
    path('login/', obtain_auth_token, name='api_token_auth'),
] + router.urls