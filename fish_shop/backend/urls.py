from django.urls import path
from .views import *

urlpatterns = [
    path('login/', logIn, name='log_in'),
    path('signup/', signUp, name='sign_up'),
    path('home/', getFish_no_promotion, name='get_fishes'),
    path('getCategories/', getCategories, name='get_categories'),
    path('getFishes/', getFish_no_promotion, name='get_fishes_no_promotion'),
    path('getFishesPromotion/', getFish_promotion, name='get_fishes_promotion'),
]



# ----- OLD VERSION -----
# from django.urls import path
# from . import views

# urlpatterns = [

#     path('getfish_no_special/', views.getFish_no_special, name='getfish_no_special'),
#     path('getfish_special/', views.getFish_special, name='getfish_special'),
#     path('getfish/', views.getFish, name='getfish'),
#     path('check_out/', views.check_out, name='check_out'),
#     path('add_cart/', views.addCart, name='add_cart'),
#     path('remove_cart/', views.removeCart, name='remove_cart'),
#     path('update_cart/', views.updateCart, name='update_cart'),
#     path('select_cart/', views.selectCart, name='select_cart'),
#     path('user_info/', views.user_info, name='user_info'),
#     path('get_user_info/', views.get_user_info, name='get_user_info'),
#     path('get_reports/', views.getReports, name='get_reports'),
#     path('select_wishlist/', views.select_wishlist, name='select_wishlist'),
#     path('add_wishlist/', views.add_wishlist, name='add_wishlist'),
#     path('remove_wishlist/', views.remove_wishlist, name='remove_wishlist'),
#     path('export_hoadon_pdf/<int:ma_hoa_don>/', views.export_hoadon_pdf, name='export_hoadon_pdf'),
#     path('getfoods/', views.getFoods, name='getfoods'),
#     path('get_one_food/', views.get_one_food, name='get_one_food'),
#     path('add_food_wishlist/', views.add_food_wishlist, name='add_food_wishlist')    
# ]