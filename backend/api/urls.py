from django.urls import path
from . import views

urlpatterns = [
    path("groceries/", views.GroceryItemListCreate.as_view(), name="grocery-item-list"),
    path("groceries/delete/<int:pk>/", views.GroceryItemListDelete.as_view(), name="delete-grocery"),
]