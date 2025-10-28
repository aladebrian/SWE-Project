from django.contrib import admin
from .models import GroceryItem, GroceryList, ListItems, Profile, Recipe, RecipeIngredient, Store, StorePrice, SharedList, Notification, Purchase

admin.site.register(GroceryItem)
admin.site.register(GroceryList)
admin.site.register(ListItems)
admin.site.register(Profile)
admin.site.register(Recipe)
admin.site.register(RecipeIngredient)
admin.site.register(Store)
admin.site.register(StorePrice)
admin.site.register(SharedList)
admin.site.register(Notification)
admin.site.register(Purchase)
