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

    def __str__(self):
        return self.title

