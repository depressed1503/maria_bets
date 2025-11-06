from django.contrib import admin
from django.urls import include, path
from auth.urls import urlpatterns as auth_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include(auth_urls)),
]
