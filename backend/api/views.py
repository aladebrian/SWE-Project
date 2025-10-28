from django.contrib.auth.models import User
from rest_framework import viewsets, generics
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
from .serializers import (
    UserSerializer,
    GroceryItemSerializer,
    GroceryListSerializer,
    ListItemsSerializer,
    ProfileSerializer,
    RecipeSerializer,
    RecipeIngredientSerializer,
    StoreSerializer,
    StorePriceSerializer,
    SharedListSerializer,
    NotificationSerializer,
    PurchaseSerializer
)

# USER REGISTRATION VIEW

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# MODEL VIEWSETS WITH QUERYSET DEFINED
class GroceryItemViewSet(viewsets.ModelViewSet):
    queryset = GroceryItem.objects.all()
    serializer_class = GroceryItemSerializer
    permission_classes = [IsAuthenticated]

class GroceryListViewSet(viewsets.ModelViewSet):
    queryset = GroceryList.objects.all()
    serializer_class = GroceryListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return GroceryList.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class ListItemsViewSet(viewsets.ModelViewSet):
    queryset = ListItems.objects.all()
    serializer_class = ListItemsSerializer
    permission_classes = [IsAuthenticated]

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticated]

class RecipeIngredientViewSet(viewsets.ModelViewSet):
    queryset = RecipeIngredient.objects.all()
    serializer_class = RecipeIngredientSerializer
    permission_classes = [IsAuthenticated]

class StoreViewSet(viewsets.ModelViewSet):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer
    permission_classes = [IsAuthenticated]

class StorePriceViewSet(viewsets.ModelViewSet):
    queryset = StorePrice.objects.all()
    serializer_class = StorePriceSerializer
    permission_classes = [IsAuthenticated]

class SharedListViewSet(viewsets.ModelViewSet):
    queryset = SharedList.objects.all()
    serializer_class = SharedListSerializer
    permission_classes = [IsAuthenticated]

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

class PurchaseViewSet(viewsets.ModelViewSet):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer
    permission_classes = [IsAuthenticated]
