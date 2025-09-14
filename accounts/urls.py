# accounts/urls.py
from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/', views.get_current_user, name='get_current_user'),
    path('admin/dashboard/', views.admin_dashboard, name='admin_dashboard'),
    path('employer/dashboard/', views.employer_dashboard, name='employer_dashboard'),
    path('job-seeker/dashboard/', views.job_seeker_dashboard, name='job_seeker_dashboard'),
]