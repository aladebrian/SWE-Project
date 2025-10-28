from django.contrib.auth.models import User
from rest_framework import serializers
from .models import GroceryList, GroceryItem
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class GroceryItemSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='item_id', read_only=True)
    class Meta:
        model = GroceryItem
        fields = ['id', 'name', 'category', 'price']

class GroceryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroceryList
        fields = ['list_id', 'title', 'created_at', 'items', 'owner']
        extra_kwargs = {"owner": {"read_only": True}}