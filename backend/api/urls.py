from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    GroceryItemViewSet,
    GroceryListViewSet,
    ListItemsViewSet,
    ProfileViewSet,
    RecipeViewSet,
    RecipeIngredientViewSet,
    StoreViewSet,
    StorePriceViewSet,
    SharedListViewSet,
    NotificationViewSet,
    PurchaseViewSet,
    CreateUserView
)

router = DefaultRouter()
router.register(r'grocery-items', GroceryItemViewSet)
router.register(r'grocery-lists', GroceryListViewSet)
router.register(r'list-items', ListItemsViewSet)
router.register(r'profiles', ProfileViewSet)
router.register(r'recipes', RecipeViewSet)
router.register(r'recipe-ingredients', RecipeIngredientViewSet)
router.register(r'stores', StoreViewSet)
router.register(r'store-prices', StorePriceViewSet)
router.register(r'shared-lists', SharedListViewSet)
router.register(r'notifications', NotificationViewSet)
router.register(r'purchases', PurchaseViewSet)

urlpatterns = [
    path('register/', CreateUserView.as_view(), name='register'),
    path('', include(router.urls)),
]
