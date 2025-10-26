from django.urls import path
from . import views

urlpatterns = [
    path("groceries/", views.GroceryListCreate.as_view(), name="grocery-list-create"),
    path("groceries/delete/<int:pk>/", views.GroceryListDelete.as_view(), name="grocery-list-delete"),
]