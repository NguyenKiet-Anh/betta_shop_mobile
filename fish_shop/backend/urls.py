from django.urls import path
from .views import *

urlpatterns = [
    path('login/', logIn, name='log_in'),
    path('signup/', signUp, name='sign_up'),
    path('home/', getFish_no_promotion, name='get_fishes'),
    path('getCategories/', getCategories, name='get_categories'),
    path('getFishesAll/', getFish_all, name='get_fish_all'),
    path('getFishes/', getFish_no_promotion, name='get_fishes_no_promotion'),
    path('getFishesPromotion/', getFish_promotion, name='get_fishes_promotion'),
    path('getFishById/<int:id>/', get_fish_by_id, name='get_fish_by_id'),
    path('getWishList/<int:ma_khach_hang>/', get_wishList, name='get_wishList'),
    path('addWishList/', add_wishList, name='add_wishList'),    
    path('removeWishList/<int:ma_khach_hang>/<int:ma_ca>/', remove_wishList, name='remove_wishList'),
    path('deleteWishList/<int:ma_khach_hang>/', delete_wishList, name='delete_wishList'),
    path('getCart/<int:ma_khach_hang>/', get_cart, name='get_cart'),
    path('addCart/<int:ma_khach_hang>/<int:ma_ca>/', add_cart, name='add_cart'),
    path('updateCart/<int:ma_khach_hang>/<int:action_option>/<int:amount>/', update_cart, name='update_cart'),
    path('removeCart/<int:ma_khach_hang>/<int:ma_ca>/', remove_cart, name='remove_cart'),
    path('deleteCart/<int:ma_khach_hang>/', delete_cart, name='delete_cart'),
]

# ----- OLD VERSION -----
# urlpatterns = [
#     path('check_out/', views.check_out, name='check_out'),
#     path('user_info/', views.user_info, name='user_info'),
#     path('get_user_info/', views.get_user_info, name='get_user_info'),
#     path('get_reports/', views.getReports, name='get_reports'),
#     path('export_hoadon_pdf/<int:ma_hoa_don>/', views.export_hoadon_pdf, name='export_hoadon_pdf'),
# ]