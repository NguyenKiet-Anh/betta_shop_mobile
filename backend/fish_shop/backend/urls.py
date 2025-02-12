from django.urls import path
from .views import *

urlpatterns = [
    path("login/", logIn, name="log_in"),
    path("signup/", signUp, name="sign_up"),
    path("activateAccount/<str:email>", activate_account, name="activate_account"),
    path("home/", getFish_no_promotion, name="get_fishes"),
    # For fish
    path("getCategories/", getCategories, name="get_categories"),
    path("getFishesAll/", getFish_all, name="get_fish_all"),
    path("getFishes/", getFish_no_promotion, name="get_fishes_no_promotion"),
    path("getFishesPromotion/", getFish_promotion, name="get_fishes_promotion"),
    path("getFishesForAdmin/", get_fish_for_admin, name="get_fishes_for_admin"),
    path("getFishById/<int:id>/", get_fish_by_id, name="get_fish_by_id"),
    path(
        "deleteFishForAdmin/<int:ma_ca>/", delete_fish_admin, name="delete_fish_admin"
    ),
    # For wishlist
    path("getWishList/<int:ma_khach_hang>/", get_wishList, name="get_wishList"),
    path("addWishList/", add_wishList, name="add_wishList"),
    path(
        "removeWishList/<int:ma_khach_hang>/<int:ma_ca>/",
        remove_wishList,
        name="remove_wishList",
    ),
    path(
        "deleteWishList/<int:ma_khach_hang>/", delete_wishList, name="delete_wishList"
    ),
    # For cart
    path("getCart/<int:ma_khach_hang>/", get_cart, name="get_cart"),
    path("addCart/<int:ma_khach_hang>/<int:ma_ca>/", add_cart, name="add_cart"),
    path(
        "updateCart/<int:ma_khach_hang>/<int:ma_ca>/", update_cart, name="update_cart"
    ),
    path(
        "removeCart/<int:ma_khach_hang>/<int:ma_ca>/", remove_cart, name="remove_cart"
    ),
    path("deleteCart/<int:ma_khach_hang>/", delete_cart, name="delete_cart"),
    path(
        "checkOut/<int:ma_khach_hang>/<str:ma_don_hang>/<int:ma_thanh_toan>/",
        check_out,
        name="check_out",
    ),
    # For payment link - for web
    path("createPaymentLink/", create_payment_link, name="create_payment_link"),
    path("transactionStatus/", transaction_status, name="transaction_status"),
    path("getNotification/", GetNotificationView.as_view(), name="get_notification"),
    # For user
    path("getUser/<int:ma_khach_hang>/", get_user, name="get_user_info"),
    path("getHistory/<int:ma_khach_hang>/", get_history, name="get_payment_history"),
    path("updateUser/<int:ma_khach_hang>/", update_user, name="update_user_info"),
    path(
        "changePassword/<int:ma_khach_hang>/", change_password, name="change_password"
    ),  # ma_khach_hang here refered to ma_tai_khoan
    path("updateAvatar/<int:ma_khach_hang>/", update_avatar, name="update_user_avatar"),
    path("getUsersForAdmin/", get_user_for_admin, name="get_users_for_admin"),
    path(
        "deleteUserForAdmin/<int:ma_khach_hang>/",
        delete_user_for_admin,
        name="delete_user_for_admin",
    ),
    # For district
    path("getAllDistricts/", get_all_districts, name="get_all_districts"),
    # For review
    path("getReview/<int:id>/", get_review_by_fish_id, name="get_review_by_fish_id"),
    path("addReview/", add_review, name="add_review"),
    # For store location
    path("getStoreLocation/", get_store_locations, name="get_store_location"),
]
