# accounts/models.py
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('role', User.Role.ADMIN)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))

        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    class Role(models.TextChoices):
        JOB_SEEKER = 'job_seeker', 'Job Seeker'
        EMPLOYER = 'employer', 'Employer'
        ADMIN = 'admin', 'Admin'

    # Remove the username field
    username = None
    # Make email the unique identifier
    email = models.EmailField(_('email address'), unique=True)
    role = models.CharField(
        max_length=20, 
        choices=Role.choices, 
        default=Role.JOB_SEEKER
    )
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []  # Remove 'username' from required fields
    
    objects = CustomUserManager()

    def __str__(self):
        return self.email