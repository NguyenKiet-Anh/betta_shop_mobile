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
    path('addWishList/', add_wishList, name='add_wishList'),
    path('getWishList/<int:ma_khach_hang>/', get_wishList, name='get_wishList'),
    path('removeWishList/<int:ma_khach_hang>/<int:ma_ca>/', remove_wishList, name='remove_wishList'),
    path('deleteWishList/<int:ma_khach_hang>/', delete_wishList, name='delete_wishList'),
]



# ----- OLD VERSION -----
# urlpatterns = [
#     path('check_out/', views.check_out, name='check_out'),
#     path('add_cart/', views.addCart, name='add_cart'),
#     path('remove_cart/', views.removeCart, name='remove_cart'),
#     path('update_cart/', views.updateCart, name='update_cart'),
#     path('select_cart/', views.selectCart, name='select_cart'),
#     path('user_info/', views.user_info, name='user_info'),
#     path('get_user_info/', views.get_user_info, name='get_user_info'),
#     path('get_reports/', views.getReports, name='get_reports'),
#     path('export_hoadon_pdf/<int:ma_hoa_don>/', views.export_hoadon_pdf, name='export_hoadon_pdf'),
# ]