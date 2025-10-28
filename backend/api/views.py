from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, GroceryListSerializer, GroceryItemSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import GroceryList, GroceryItem

class GroceryItemListCreate(generics.ListCreateAPIView):
    serializer_class = GroceryItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return GroceryItem.objects.all()
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)

class GroceryItemListDelete(generics.DestroyAPIView):
    serializer_class = GroceryItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return GroceryItem.objects.all()
    
    def perform_destroy(self, instance):
        instance.delete()

class GroceryListCreate(generics.ListCreateAPIView):
    serializer_class = GroceryListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return GroceryList.objects.filter(owner=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
        else:
            print(serializer.errors)

class GroceryListDelete(generics.DestroyAPIView):
    serializer_class = GroceryListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return GroceryList.objects.filter(owner=user)
    
    def perform_destroy(self, instance):
        instance.delete()

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]