from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.serializers import Serializer
from .models import *
from .serializers import *
from backend import serializers

from reportlab.pdfgen import canvas
from reportlab.lib import fonts
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics

from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.contrib.auth import login
from django.contrib.auth.models import User

# Encodeing image data before sending to client
import base64, datetime

# Verify Email Import
import secrets
from django.core.mail import send_mail
from django.core.cache import cache
from validate_email import (
    validate_email,
)  # pip install py3-validate-email==1.0.4, pip install dnspython==2.4.1

# Create your views here.


# api for logging in
@api_view(["POST"])
def logIn(request):
    try:
        password = request.data.get("password")
        username = request.data.get("username")
        account = TaiKhoan.objects.get(TenTaiKhoan=username, MatKhau=password)
        if account.isActivated:
            return Response(
                {
                    "success": True,
                    "message": "Đăng nhập thành công!",
                    "isAdmin": account.isAdmin,
                    "isLoggedIn": account.isCustomer,
                    "ma_tai_khoan": account.MaTaiKhoan,
                }
            )
        else:
            return Response(
                {"success": False, "message": "Tài khoản chưa được xác nhận!"}
            )
    except Exception as e:
        print("Error: ", e)
        return Response({"success": False, "message": "Đăng nhập thất bại!"})


# api for signing up
@api_view(["POST"])
def signUp(request):

    if request.data.get("is_first_request", False):
        username = request.data.get("username")
        password = request.data.get("password")
        fullname = request.data.get("fullname")
        email = request.data.get("email")
        phone_number = request.data.get("phone_number")
        district_code = request.data.get("district_code")
        address = request.data.get("address")

        try:
            account = TaiKhoan.objects.filter(TenTaiKhoan=username)
            if account:
                return Response({"success": False, "message": "USERNAME đã tồn tại!"})

            email_used = KhachHang.objects.filter(Email=email)
            if email_used:
                return Response(
                    {
                        "success": False,
                        "message": "Email đã được sử dụng trên tài khoản khác",
                    }
                )

            phone_used = KhachHang.objects.filter(SoDienThoai=phone_number)
            if phone_used:
                return Response(
                    {
                        "success": False,
                        "message": "Số điện thoại đã được sử dụng trên tài khoản khác",
                    }
                )

        except TaiKhoan.DoesNotExist:
            pass

        verification_token = secrets.token_urlsafe(32)
        token = {"token": verification_token}

        cache_key = f"signup_data_{verification_token}"
        cache.set(cache_key, token, timeout=300)

        ok = send_mail(
            "Verify Your Email",
            f"Click the following link to verify your email: http://localhost:3000/signup?token={verification_token}",
            "edwarddao20@gmail.com",
            [request.data["email"]],
            fail_silently=False,
        )

        if ok:
            new_account = TaiKhoan.objects.create(
                isAdmin=False,
                isCustomer=True,
                isActivated=False,
                TenTaiKhoan=username,
                MatKhau=password,
                verification_token=verification_token,
            )
            new_account.save()

            new_user = KhachHang.objects.create(
                TenKhachHang=fullname,
                SoDienThoai=phone_number,
                Email=email,
            )
            new_user.save()

            ma_tai_khoan = new_account.MaTaiKhoan
            ma_khach_hang = new_user.MaKhachHang

            new_user_account = TaiKhoanKhachHang.objects.create(
                MaKhachHang=ma_khach_hang,
                MaTaiKhoan=ma_tai_khoan,
            )
            new_user_account.save()

            new_user_address = KhachHangDiaChi.objects.create(
                MaKhachHang=ma_khach_hang,
                MaQuan=district_code,
                DiaChi=address,
            )
            new_user_address.save()

            return Response({"success": True, "message": "Đăng ký thành công!"})
        else:
            return Response(
                {"success": False, "message": "Đăng ký thất bại. Email không tồn tại!"}
            )

    elif request.data.get("activate", False):

        cache_key = f'signup_data_{request.data["token"]}'
        cached_data = cache.get(cache_key)

        if not cached_data:
            return Response(
                {"success": False, "message": "Cached data not found or expired."}
            )

        try:
            verification_token = cached_data.get("token")

            activate_account = TaiKhoan.objects.get(
                verification_token=verification_token
            )
            if activate_account:
                activate_account.is_actived = True
                activate_account.save()
                return Response(
                    {"success": True, "message": "Tài khoản kích hoạt thành công!"}
                )
            else:
                return Response(
                    {
                        "success": False,
                        "message": "Tài khoản đã bị xoá trước khi được kích hoạt!",
                    }
                )
        except:
            return Response({"success": False, "message": "Lỗi hệ thống!!!"})


# Get all categories
@api_view(["GET"])
def getCategories(request):
    # Get data from database
    categories = LoaiMatHang.objects.all()
    # Convert from Queryset format to Json format, many = True because there are many data rows.
    serializers = LOAIMATHANG_Serializer(categories, many=True)
    # Return Json format
    return Response(serializers.data)


# get all fishes both promotion or not promotion
@api_view(["GET"])
def getFish_all(request):
    # Get data from database
    fishes = MatHang.objects.all()
    # Convert from Queryset format to Json format, many = True because there are many data rows.
    serializers = MATHANG_Serializer(fishes, many=True)
    # Encode images before sending
    for item in serializers.data:
        # Encode HinhAnh1 before sending
        if item["HinhAnh1"]:
            with open(item["HinhAnh1"], "rb") as file:
                data = file.read()
                base64_encoded_data = base64.b64encode(data).decode("utf-8")
                item["HinhAnh1"] = base64_encoded_data
        # Encode HinhAnh2 before sending
        if item["HinhAnh2"]:
            with open(item["HinhAnh2"], "rb") as file:
                data = file.read()
                base64_encoded_data = base64.b64encode(data).decode("utf-8")
                item["HinhAnh2"] = base64_encoded_data
        # Encode HinhAnh3 before sending
        if item["HinhAnh3"]:
            with open(item["HinhAnh3"], "rb") as file:
                data = file.read()
                base64_encoded_data = base64.b64encode(data).decode("utf-8")
                item["HinhAnh3"] = base64_encoded_data
        # Encode HinhAnh4 before sending
        if item["HinhAnh4"]:
            with open(item["HinhAnh4"], "rb") as file:
                data = file.read()
                base64_encoded_data = base64.b64encode(data).decode("utf-8")
                item["HinhAnh4"] = base64_encoded_data
    # Return Json format
    return Response(serializers.data)


# get all fishes not in promotion
@api_view(["GET"])
def getFish_no_promotion(request):
    # Get data from database
    fishes = MatHang.objects.filter(KhuyenMai=False)
    # Convert from Queryset format to Json format, many = True because there are many data rows.
    serializers = MATHANG_Serializer(fishes, many=True)
    # Encode images before sending
    for item in serializers.data:
        # Encode HinhAnh1 before sending
        if item["HinhAnh1"]:
            with open(item["HinhAnh1"], "rb") as file:
                data = file.read()
                base64_encoded_data = base64.b64encode(data).decode("utf-8")
                item["HinhAnh1"] = base64_encoded_data
        # Encode HinhAnh2 before sending
        if item["HinhAnh2"]:
            with open(item["HinhAnh2"], "rb") as file:
                data = file.read()
                base64_encoded_data = base64.b64encode(data).decode("utf-8")
                item["HinhAnh2"] = base64_encoded_data
        # Encode HinhAnh3 before sending
        if item["HinhAnh3"]:
            with open(item["HinhAnh3"], "rb") as file:
                data = file.read()
                base64_encoded_data = base64.b64encode(data).decode("utf-8")
                item["HinhAnh3"] = base64_encoded_data
        # Encode HinhAnh4 before sending
        if item["HinhAnh4"]:
            with open(item["HinhAnh4"], "rb") as file:
                data = file.read()
                base64_encoded_data = base64.b64encode(data).decode("utf-8")
                item["HinhAnh4"] = base64_encoded_data
    # Return Json format
    return Response(serializers.data)


# Get all fishes in promotion
@api_view(["GET"])
def getFish_promotion(request):
    # Get data from database
    fishes = MatHang.objects.filter(KhuyenMai=True)
    # Convert from Queryset format to Json format, many = True because there are many data rows.
    serializers = MATHANG_Serializer(fishes, many=True)
    # Encode images before sending
    for item in serializers.data:
        # Encode HinhAnh1 before sending
        if item["HinhAnh1"]:
            with open(item["HinhAnh1"], "rb") as file:
                data = file.read()
                base64_encoded_data = base64.b64encode(data).decode("utf-8")
                item["HinhAnh1"] = base64_encoded_data
        # Encode HinhAnh2 before sending
        if item["HinhAnh2"]:
            with open(item["HinhAnh2"], "rb") as file:
                data = file.read()
                base64_encoded_data = base64.b64encode(data).decode("utf-8")
                item["HinhAnh2"] = base64_encoded_data
        # Encode HinhAnh3 before sending
        if item["HinhAnh3"]:
            with open(item["HinhAnh3"], "rb") as file:
                data = file.read()
                base64_encoded_data = base64.b64encode(data).decode("utf-8")
                item["HinhAnh3"] = base64_encoded_data
        # Encode HinhAnh4 before sending
        if item["HinhAnh4"]:
            with open(item["HinhAnh4"], "rb") as file:
                data = file.read()
                base64_encoded_data = base64.b64encode(data).decode("utf-8")
                item["HinhAnh4"] = base64_encoded_data
    # Return Json format
    return Response(serializers.data)


# Get fish by fish's id
@api_view(["GET"])
def get_fish_by_id(request, id):
    try:
        # Get data from database
        fish = MatHang.objects.get(MaMatHang=id)
    except MatHang.DoesNotExist:
        return Response({"message": "Fish not found"}, status=404)

    serializers = MATHANG_Serializer(fish)
    data = serializers.data

    # Encode images before sending
    if data.get("HinhAnh1"):
        with open(data["HinhAnh1"], "rb") as file:
            image_data = file.read()
            base64_encoded = base64.b64encode(image_data).decode("utf-8")
            data["HinhAnh1"] = base64_encoded

    if data.get("HinhAnh2"):
        with open(data["HinhAnh2"], "rb") as file:
            image_data = file.read()
            base64_encoded = base64.b64encode(image_data).decode("utf-8")
            data["HinhAnh2"] = base64_encoded

    if data.get("HinhAnh3"):
        with open(data["HinhAnh3"], "rb") as file:
            image_data = file.read()
            base64_encoded = base64.b64encode(image_data).decode("utf-8")
            data["HinhAnh3"] = base64_encoded

    if data.get("HinhAnh4"):
        with open(data["HinhAnh4"], "rb") as file:
            image_data = file.read()
            base64_encoded = base64.b64encode(image_data).decode("utf-8")
            data["HinhAnh4"] = base64_encoded
    # Return as Json format
    return Response(data)


# Get wishlist of each customer
@api_view(["GET"])
def get_wishList(request, ma_khach_hang):
    # Get yeuthich
    yeuthichs = YeuThich.objects.filter(MaKhachHang=ma_khach_hang)
    # Serializing data
    serializers = YEUTHICH_Serializer(yeuthichs, many=True)
    # # Encode images before sending
    for item in serializers.data:
        # Encode HinhAnh1 before sending
        if item["ca_info"]["HinhAnh1"]:
            with open(item["ca_info"]["HinhAnh1"], "rb") as file:
                data = file.read()
                base64_encoded_data = base64.b64encode(data).decode("utf-8")
                item["ca_info"]["HinhAnh1"] = base64_encoded_data
        # Encode HinhAnh2 before sending
        if item["ca_info"]["HinhAnh2"]:
            with open(item["ca_info"]["HinhAnh2"], "rb") as file:
                data = file.read()
                base64_encoded_data = base64.b64encode(data).decode("utf-8")
                item["ca_info"]["HinhAnh2"] = base64_encoded_data
        # Encode HinhAnh3 before sending
        if item["ca_info"]["HinhAnh3"]:
            with open(item["ca_info"]["HinhAnh3"], "rb") as file:
                data = file.read()
                base64_encoded_data = base64.b64encode(data).decode("utf-8")
                item["ca_info"]["HinhAnh3"] = base64_encoded_data
        # Encode HinhAnh4 before sending
        if item["ca_info"]["HinhAnh4"]:
            with open(item["ca_info"]["HinhAnh4"], "rb") as file:
                data = file.read()
                base64_encoded_data = base64.b64encode(data).decode("utf-8")
                item["ca_info"]["HinhAnh4"] = base64_encoded_data
    return Response(serializers.data)


# Add fish to wishlist
@api_view(["POST"])
def add_wishList(request):
    ma_khach_hang = request.data.get("userId")
    ma_ca = request.data.get("fishId")
    # Get KhachHang
    user_id = KhachHang.objects.get(MaKhachHang=ma_khach_hang)
    # Get fish
    fish = MatHang.objects.get(MaMatHang=ma_ca)
    # Check if fish exists or not
    check_fish = YeuThich.objects.filter(MaKhachHang=user_id, MaMatHang=fish)
    if check_fish:
        # Return message that annouces to client the problem in process
        return Response({"success": False, "message": "Cá đã tồn tại trong yêu thích"})
    else:
        # Add fish to Yeuthich table
        YeuThich.objects.create(
            MaKhachHang=user_id,
            MaMatHang=fish,
        )
        # Return message anoucing successful process
        return Response(
            {"success": True, "message": "Thêm cá vào yêu thích thành công"}
        )


# Remove fish from wishlist
@api_view(["DELETE"])
def remove_wishList(request, ma_khach_hang, ma_ca):
    try:
        # Get Yeuthich table
        yeuthich_instance = YeuThich.objects.filter(
            MaKhachHang=ma_khach_hang, MaMatHang=ma_ca
        )
        yeuthich_instance.delete()
        return Response(
            {"success": True, "message": "Xóa thành công cá khỏi yêu thích!"}
        )
    except:
        return Response(
            {"success": False, "message": "Xóa cá khỏi yêu thích thất bại!"}
        )


# Delete all items in wishlist
@api_view(["DELETE"])
def delete_wishList(request, ma_khach_hang):
    try:
        # Get Yeuthich table
        yeuthich_instance = YeuThich.objects.filter(MaKhachHang=ma_khach_hang)
        yeuthich_instance.delete()
        return Response(
            {"success": True, "message": "Xóa thành công tất cả cá khỏi yêu thích!"}
        )
    except:
        return Response(
            {"success": False, "message": "Xóa tất cả cá khỏi yêu thích thất bại!"}
        )


# Get cart
@api_view(["GET"])
def get_cart(request, ma_khach_hang):
    # Get cart data from databse
    giohang_instance = GioHang.objects.get(MaKhachHang=ma_khach_hang)
    # Get cart details
    chi_tiets = ChiTietGioHang.objects.filter(MaGioHang=giohang_instance)
    # Serializing data
    serializers = CT_GIOHANG_Serializer(chi_tiets, many=True)
    # Encode image before sending
    for item in serializers.data:
        # Encode HinhAnh1 before sending
        if item["ca_info"]["HinhAnh1"]:
            with open(item["ca_info"]["HinhAnh1"], "rb") as file:
                data = file.read()
                base64_encoded_data = base64.b64encode(data).decode("utf-8")
                item["ca_info"]["HinhAnh1"] = base64_encoded_data
        # Encode HinhAnh2 before sending
        if item["ca_info"]["HinhAnh2"]:
            with open(item["ca_info"]["HinhAnh2"], "rb") as file:
                data = file.read()
                base64_encoded_data = base64.b64encode(data).decode("utf-8")
                item["ca_info"]["HinhAnh2"] = base64_encoded_data
        # Encode HinhAnh3 before sending
        if item["ca_info"]["HinhAnh3"]:
            with open(item["ca_info"]["HinhAnh3"], "rb") as file:
                data = file.read()
                base64_encoded_data = base64.b64encode(data).decode("utf-8")
                item["ca_info"]["HinhAnh3"] = base64_encoded_data
        # Encode HinhAnh4 before sending
        if item["ca_info"]["HinhAnh4"]:
            with open(item["ca_info"]["HinhAnh4"], "rb") as file:
                data = file.read()
                base64_encoded_data = base64.b64encode(data).decode("utf-8")
                item["ca_info"]["HinhAnh4"] = base64_encoded_data
    return Response(serializers.data)


# Add cart
@api_view(['POST'])
def add_cart(request, ma_khach_hang, ma_ca):
     try:     
          # Get fish from database
          fish = MatHang.objects.filter(MaMatHang=ma_ca).first()
          if fish.SoLuongTon < 1:
               return Response({'success': False, 'message': 'Cá đã hết hàng'})
          # Get cart
          giohang = GioHang.objects.filter(MaKhachHang=ma_khach_hang).first()
          # Add item to cart
          check_fish = ChiTietGioHang.objects.filter(MaGioHang=giohang, MaMatHang=fish).first()
          if check_fish:          
               # Return message that annouces to client the problem in process
               return Response({'success': False, 'message': 'Cá đã tồn tại trong giỏ hàng'})
          else:  
               # Update TongTien
               giohang.TongTien += fish.Dongia
               giohang.save();
               # Add fish to ChiTietGioHang table
               # If khuyenmai = false
               if fish.KhuyenMai == False:
                    ChiTietGioHang.objects.create(               
                         MaGioHang = giohang,
                         MaMatHang = fish,
                         SoLuong = 1,
                         ThanhTien = fish.Dongia,
                         TinhTrang = False
                    )
               else:
                    ChiTietGioHang.objects.create(               
                         MaGioHang = giohang,
                         MaMatHang = fish,
                         SoLuong = 1,
                         ThanhTien = fish.GiaKhuyenMai,
                         TinhTrang = False
                    )
               # Reduce SoLuongTon
               fish.SoLuongTon -= 1
               fish.save()                              
               # Return message anoucing successful process
          return Response({'success': True, 'message': 'Thêm cá vào giỏ hàng thành công'})
     except Exception as e:
          print(e)
          return Response({'success': False, 'message': 'Thêm cá vào giỏ hàng thất bại'})



# Update cart
@api_view(["PUT"])
def update_cart(request, ma_khach_hang, ma_ca):
    try:
        action = request.data.get("action")
        # Get fish
        fish = MatHang.objects.get(MaMatHang=ma_ca)
        # Get khachang
        khachhang = TaiKhoanKhachHang.objects.get(MaTaiKhoan=ma_khach_hang)
        # Get giohang
        giohang = GioHang.objects.filter(
            MaKhachHang=khachhang.MaKhachHang.MaKhachHang
        ).first()
        # Get giohang_chitiet
        chitiet = ChiTietGioHang.objects.filter(
            MaGioHang=giohang.MaGioHang, MaMatHang=ma_ca
        ).first()
        # Update giohang_chitiet
        if action == "Increase":
            chitiet.SoLuong += 1
            fish.SoLuongTon -= 1
        elif action == "Reduce":
            chitiet.SoLuong -= 1
            fish.SoLuongTon += 1
        fish.save()
        chitiet.save()
        return Response({"success": True})
    except Exception as e:
        print(e)
        return Response({"success": False})


# Delete cart
@api_view(["DELETE"])
def remove_cart(request, ma_khach_hang, ma_ca):
    try:
        # Get cart
        giohang = GioHang.objects.filter(MaKhachHang=ma_khach_hang).first()
        # Get fish
        fish = MatHang.objects.filter(MaMatHang=ma_ca).first()
        # Reduct total price in giohang
        giohang.TongTien -= fish.Dongia
        giohang.save()
        # Get cart detail
        chitiet = ChiTietGioHang.objects.filter(
            MaGioHang=giohang, MaMatHang=ma_ca
        ).first()
        # Increase SoLuongTon
        fish.SoLuongTon += chitiet.SoLuong
        fish.save()
        chitiet.delete()
        return Response(
            {"success": True, "message": "Xóa thành công cá khỏi giỏ hàng!"}
        )
    except Exception as e:
        print(e)
        return Response({"success": False, "message": "Xóa cá khỏi giỏ hàng thất bại!"})


# Delete cart
@api_view(["DELETE"])
def delete_cart(request, ma_khach_hang):
    try:
        # Get cart table
        giohang = GioHang.objects.filter(MaKhachHang=ma_khach_hang)
        chitiet = ChiTietGioHang.objects.filter(MaGioHang__in=giohang)
        chitiet.delete()
        return Response(
            {"success": True, "message": "Xóa thành công tất cả cá khỏi giỏ hàng!"}
        )
    except:
        return Response(
            {"success": False, "message": "Xóa tất cả cá khỏi giỏ hàng thất bại!"}
        )

# Check out cart
@api_view(['DELETE'])
def check_out(request, ma_khach_hang):
     try:
          # Get ma_khach_hang
          khachhang = TaiKhoanKhachHang.objects.filter(MaTaiKhoan=ma_khach_hang).first()          
          # Get all chitietgiohang
          giohang = GioHang.objects.filter(MaKhachHang=khachhang.MaKhachHang).first()        
          chitiet = ChiTietGioHang.objects.filter(MaGioHang=giohang.MaGioHang)
          chitiet.delete()
          # Update TongTien in giohang
          giohang.TongTien = 0
          giohang.save()
          return Response({'success': True})
     except Exception as e:
          print(e)
          return Response({'success': False})
     
# API for create payment link
@api_view(['POST'])
def create_payment_link(request):
     try:
          # Get data for payment 
          total_price = request.data.get('total_price')
          # total_price = request.data.get("totalPrice")
          # Data for create payment link
          import json
          import uuid
          import requests
          import hmac
          import hashlib
          # parameters send to MoMo get get payUrl
          endpoint = "https://test-payment.momo.vn/v2/gateway/api/create"
          accessKey = "F8BBA842ECF85"
          secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz"
          orderInfo = "pay with MoMo"
          partnerCode = "MOMO"
          redirectUrl = "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b"
          ipnUrl = "https://9ee0-2001-ee0-266-ba76-2a96-bf50-2d81-c185.ngrok-free.app/getNotification/"
          amount = str(total_price)
          orderId = str(uuid.uuid4())
          requestId = str(uuid.uuid4())
          extraData = ""  # pass empty value or Encode base64 JsonString
          partnerName = "MoMo Payment"
          requestType = "payWithMethod"
          storeId = "Test Store"
          orderGroupId = ""
          autoCapture = True
          lang = "vi"
          orderGroupId = ""
          # before sign HMAC SHA256 with format: accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl
          # &orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId
          # &requestType=$requestType
          rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId \
                         + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl\
                         + "&requestId=" + requestId + "&requestType=" + requestType
          # puts raw signature
          print("--------------------RAW SIGNATURE----------------")
          print(rawSignature)
          # signature
          h = hmac.new(bytes(secretKey, 'ascii'), bytes(rawSignature, 'ascii'), hashlib.sha256)
          signature = h.hexdigest()
          print("--------------------SIGNATURE----------------")
          print(signature)
          # json object send to MoMo endpoint
          data = {
               'partnerCode': partnerCode,
               'orderId': orderId,
               'partnerName': partnerName,
               'storeId': storeId,
               'ipnUrl': ipnUrl,
               'amount': amount,
               'lang': lang,
               'requestType': requestType,
               'redirectUrl': redirectUrl,
               'autoCapture': autoCapture,
               'orderInfo': orderInfo,
               'requestId': requestId,
               'extraData': extraData,
               'signature': signature,
               'orderGroupId': orderGroupId
          }
          # Convert to JSON file
          data = json.dumps(data)
          # Send link create to MOMO
          response = requests.post(endpoint, data=data, headers={'Content-Type': 'application/json', 'Content-Length': str(len(data))})
          # Check response from MOMO
          if response.status_code == 200:
               result = response.json()               
               if result['resultCode'] == 0:
                    # Trả về link thanh toán nếu thành công
                    return Response({'success': True, 'result': result, 'message': result["message"]})
               else:
                    return Response({'success': False, 'error': result["message"]})
          else:
               return Response({'success': False, 'error': 'Request failed', 'details': response.text})
     except Exception as e:
          print(e)
          return Response({'success': False, 'error': str(e)})

from channels.layers import get_channel_layer
from rest_framework.response import Response
from adrf.views import APIView
import asyncio
# # For receive MOMO response
class GetNotificationView(APIView):
     async def post(self, request):
          order_id = request.data.get("orderId")
          status = request.data.get("status")
          message = request.data.get("message")     
          
          print("MOMO response for Order Id: ", order_id)

          if status is None and message == "Successful.":
               status = "success"

          if status == "success":
               print(f"Payment for Order {order_id} was successful.")
          else:
               print(f"Payment for Order {order_id} failed or has an issue.")

          channel_layer = get_channel_layer()
          group_name = f"payment_{order_id}"

          # Chờ để gửi thông báo bất đồng bộ
          await channel_layer.group_send(
               group_name,
               {
                    'type': 'payment_status_update',
                    'status': status,
                    'message': message,
               }
          )

          # Trả về Response đồng bộ sau khi hoàn thành các tác vụ bất đồng bộ
          return Response({"details": request.data})

# # For tracking transaction status
@api_view(['POST'])
def transaction_status(request):
    try:
          import hmac
          import hashlib
          import requests
          
          order_id = request.data.get("orderId")
          print("Check status for Order Id: ", order_id)
          # order_id = '9221135a-292e-4c0b-b7bc-e2c9013133e1'

          partner_code = "MOMO"
          access_key = "F8BBA842ECF85"
          secret_key = "K951B6PE1waDMi640xX08PD3vg6EkVlz"
          request_id = order_id
          
          raw_signature = f"accessKey={access_key}&orderId={order_id}&partnerCode={partner_code}&requestId={request_id}"
          
          h = hmac.new(bytes(secret_key, 'ascii'), bytes(raw_signature, 'ascii'), hashlib.sha256)
          signature = h.hexdigest()        

          data = {
               'partnerCode': partner_code,
               'requestId': request_id,
               'orderId': order_id,
               'signature': signature,
               'lang': 'vi'  # Ngôn ngữ mặc định
          }
          endpoint = "https://test-payment.momo.vn/v2/gateway/api/query"

          response = requests.post(endpoint, json=data, headers={'Content-Type': 'application/json'})

          if response.status_code == 200:
               result = response.json()
               return Response({'success': True, 'result': result, 'message': result.get("message", "Success")})
          else:
               return Response({'success': False, 'error': 'Request failed', 'details': response.text})
    
    except Exception as e:
          return Response({'success': False, 'error': str(e)})

# Get profile information
@api_view(["GET"])
def get_user(request, ma_khach_hang):
    # Get user information
    user = KhachHang.objects.filter(MaKhachHang=ma_khach_hang).first()
    # Serializing data
    serializers = NGUOIDUNG_Serializer(user)
    data = serializers.data
    # Encode avatar before sending
    if data["HinhAnh"]:
        with open(data["HinhAnh"], "rb") as file:
            data_img = file.read()
            base64_encoded_data = base64.b64encode(data_img).decode("utf-8")
            data["HinhAnh"] = base64_encoded_data
    # Get account information
    account = TaiKhoan.objects.filter(MaTaiKhoan=ma_khach_hang).first()
    # Serializing data
    serializers2 = TAIKHOAN_Serializer(account)
    # Get user address
    address = KhachHangDiaChi.objects.filter(MaKhachHang=ma_khach_hang).first()
    # Serializing data
    serializers3 = NGUOIDUNG_DIACHI_Serializer(address)
    # Return as JSON format
    return Response(
        {
            "khach_hang_info": data,
            "tai_khoan_info": serializers2.data,
            "khach_hang_diachi": serializers3.data,
        }
    )

# Update profile
@api_view(["PUT"])
def update_user(request, ma_khach_hang):
    try:
        full_name = request.data.get("full_name")
        phone_number = request.data.get("phone_number")
        district_code = request.data.get("district_code")
        address = request.data.get("address")
        account_name = request.data.get("accountName")
        # Get mataikhoan
        user = TaiKhoanKhachHang.objects.filter(MaTaiKhoan=ma_khach_hang).first()
        # Update information
        update_user = KhachHang.objects.get(MaKhachHang=user.MaKhachHang.MaKhachHang)
        # Check and update
        # Update TenKhachHang
        if full_name != update_user.TenKhachHang:
            update_user.TenKhachHang = full_name
            # Update SoDienThoai
        if phone_number != update_user.SoDienThoai:
            update_user.SoDienThoai = phone_number
        update_user.save()
        # Update address
        update_user_address = KhachHangDiaChi.objects.get(
            MaKhachHang=user.MaKhachHang.MaKhachHang
        )
        # Update district code
        if district_code != update_user_address.MaQuan:
            update_user_address.MaQuan.MaQuan = district_code
            # Update address
        if address != update_user_address.DiaChi:
            update_user_address.DiaChi = address
        update_user_address.save()
        # Update account
        update_account = TaiKhoan.objects.get(MaTaiKhoan=ma_khach_hang)
        # Update account name
        if account_name != update_account.TenTaiKhoan:
            update_account.TenTaiKhoan = account_name
        update_account.save()

        return Response({"success": True})
    except Exception as e:
        print(e)
        return Response({"success": False})


@api_view(["PUT"])
def update_avatar(request):
    pass


@api_view(["PUT"])
def change_password(request, ma_khach_hang):
    try:
        new_password = request.data.get("new_password")
        # Get TaiKhoan from database
        taikhoan = TaiKhoan.objects.get(MaTaiKhoan=ma_khach_hang)
        # Update password
        taikhoan.MatKhau = new_password
        taikhoan.save()

        return Response({"success": True})
    except:
        return Response({"success": False})


@api_view(["GET"])
def get_all_districts(request):
    try:
        # Get districts from database
        quans = Quan.objects.all()
        # Serializing data
        serializers = QUAN_Serializer(quans, many=True)
        return Response({"success": True, "districts": serializers.data})
    except:
        return Response({"success": False})


# Checking out cart


# Get reviews by fish's id
@api_view(["GET"])
def get_review_by_fish_id(request, id):
    try:
        # Get reviews from database
        review = DanhGia.objects.filter(MaMatHang=id)

    except DanhGia.DoesNotExist:
        return Response({"message": "Review not found"}, status=404)

    serializers = DANHGIA_Serializer(review, many=True)

    # Encode images before sending
    for item in serializers.data:
        # Customer avatar
        customer_info = item.get("khachhang_info", {})
        if customer_info.get("HinhAnh"):
            with open(customer_info["HinhAnh"], "rb") as file:
                data = file.read()
                base64_encoded_data = base64.b64encode(data).decode("utf-8")
                customer_info["HinhAnh"] = base64_encoded_data

    # Return as Json format
    return Response(serializers.data)


# Add review
@api_view(["POST"])
def add_review(request):
    try:
        makhachhang = request.data.get("customerID")
        mamathang = request.data.get("fishId")
        thoidiem = datetime.datetime.now()
        binhluan = request.data.get("comment")
        sao = request.data.get("rating")

        # Add review to DanhGia table
        new_danhgia = DanhGia.objects.create(
            MaKhachHang_id=makhachhang,
            MaMatHang_id=mamathang,
            ThoiDiem=thoidiem,
            BinhLuan=binhluan,
            Sao=sao,
        )
        new_danhgia.save()
        # Return message anoucing successful process
        return Response(
            {"success": True, "message": "Thêm bình luận vào đánh giá thành công"}
        )
    except:
        return Response({"success": False, "message": "Thêm bình luận thất bại"})
