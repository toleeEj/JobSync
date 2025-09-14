# accounts/permissions.py
from rest_framework import permissions

from accounts.models import User

class IsJobSeeker(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and 
                   request.user.role == User.Role.JOB_SEEKER)

class IsEmployer(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and 
                   request.user.role == User.Role.EMPLOYER)

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and 
                   request.user.role == User.Role.ADMIN)

class IsAdminOrEmployer(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and 
                   request.user.role in [User.Role.ADMIN, User.Role.EMPLOYER])