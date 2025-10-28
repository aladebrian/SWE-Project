from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class GroceryItem(models.Model):
    item_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, default='General')
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

class GroceryList(models.Model):
    list_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    items = models.ManyToManyField(GroceryItem, related_name='grocery_lists')
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='grocery_lists')


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    dietary_preferences = models.TextField(blank=True)
    budget_limit = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)


class ListItems(models.Model):
    grocery_list = models.ForeignKey(GroceryList, on_delete=models.CASCADE)
    grocery_item = models.ForeignKey(GroceryItem, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('bought', 'Bought')], default='pending')


class Recipe(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    instructions = models.TextField()
    source = models.CharField(max_length=255, blank=True)

class RecipeIngredient(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    grocery_item = models.ForeignKey(GroceryItem, on_delete=models.CASCADE)
    quantity = models.FloatField(default=1.0)


class Store(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=255)
    api_identifier = models.CharField(max_length=100, blank=True)

class StorePrice(models.Model):
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    grocery_item = models.ForeignKey(GroceryItem, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    last_updated = models.DateField(auto_now=True)

class SharedList(models.Model):
    grocery_list = models.ForeignKey(GroceryList, on_delete=models.CASCADE)
    shared_with = models.ForeignKey(User, on_delete=models.CASCADE, related_name="shared_lists")
    permission = models.CharField(max_length=20, choices=[('view', 'View'), ('edit', 'Edit')])
    invite_token = models.CharField(max_length=255, blank=True)


class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=20)
    message = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(default=False)
    
    
class Purchase(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    grocery_item = models.ForeignKey(GroceryItem, on_delete=models.CASCADE)
    date_purchased = models.DateField()
    quantity = models.PositiveIntegerField(default=1)


    def __str__(self):
        return self.title

