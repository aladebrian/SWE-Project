from django.contrib.auth.models import User
from rest_framework import serializers
from .models import (
    GroceryItem,
    GroceryList,
    ListItems,
    Profile,
    Recipe,
    RecipeIngredient,
    Store,
    StorePrice,
    SharedList,
    Notification,
    Purchase
)

# USER SERIALIZER (handles password hash/create)
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

# GROCERY ITEM SERIALIZER
class GroceryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroceryItem
        fields = ['item_id', 'name', 'category', 'price']

# LIST ITEMS SERIALIZER (for Through Model details)
class ListItemsSerializer(serializers.ModelSerializer):
    grocery_item = GroceryItemSerializer(read_only=True)
    class Meta:
        model = ListItems
        fields = ['id', 'grocery_list', 'grocery_item', 'quantity', 'status']

# GROCERY LIST SERIALIZER
class GroceryListSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    items = ListItemsSerializer(source='listitems_set', many=True, read_only=True)  # Related through ListItems

    class Meta:
        model = GroceryList
        fields = ['list_id', 'title', 'created_at', 'items', 'owner']
        extra_kwargs = {"owner": {"read_only": True}}

# PROFILE SERIALIZER
class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Profile
        fields = '__all__'

# RECIPE SERIALIZER
class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = '__all__'

# RECIPE INGREDIENT SERIALIZER
class RecipeIngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeIngredient
        fields = '__all__'

# STORE SERIALIZER
class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = '__all__'

class StorePriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = StorePrice
        fields = '__all__'

class SharedListSerializer(serializers.ModelSerializer):
    class Meta:
        model = SharedList
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

class PurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = '__all__'
