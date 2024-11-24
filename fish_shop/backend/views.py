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
import base64
# Verify Email Import
import secrets
from django.core.mail import send_mail
from django.core.cache import cache
from validate_email import validate_email    # pip install py3-validate-email==1.0.4, pip install dnspython==2.4.1
# Create your views here.

# api for logging in
@api_view(['POST'])
def logIn(request):     
     try:
          password = request.data.get('password')
          username = request.data.get('username')
          account = TaiKhoan.objects.get(TenTaiKhoan=username, MatKhau=password)          
          if account.isActivated:
               return Response({'success': True, 'message': 'Đăng nhập thành công!', 'isAdmin': account.isAdmin,
                              'isLoggedIn': account.isCustomer, 'ma_tai_khoan': account.MaTaiKhoan})
          else:
               return Response({'success': False, 'message': 'Tài khoản chưa được xác nhận!'})
     except Exception as e:
          print("Error: ", e)
          return Response({'success': False, 'message': 'Đăng nhập thất bại!'})

# api for signing up     
@api_view(['POST'])
def signUp(request):

     if request.data.get('is_first_request', False):
          username = request.data.get('username')
          password = request.data.get('password')
          fullname = request.data.get('fullname')
          email = request.data.get('email')
          phone_number = request.data.get('phone_number')
          district_code = request.data.get('district_code')
          address = request.data.get('address')          
     
          try:
               account = TaiKhoan.objects.filter(TenTaiKhoan=username)
               if account:
                    return Response({'success': False, 'message': 'USERNAME đã tồn tại!'})
               
               email_used = KhachHang.objects.filter(Email=email)
               if email_used:
                    return Response({'success': False, 'message': 'Email đã được sử dụng trên tài khoản khác'})
               
               phone_used = KhachHang.objects.filter(SoDienThoai=phone_number)
               if phone_used:
                    return Response({'success': False, 'message': 'Số điện thoại đã được sử dụng trên tài khoản khác'})

          except TaiKhoan.DoesNotExist:
               pass
          
          verification_token=secrets.token_urlsafe(32)
          token = {'token': verification_token}

          cache_key = f'signup_data_{verification_token}'
          cache.set(cache_key, token, timeout=300)

          ok = send_mail(
               'Verify Your Email',
               f'Click the following link to verify your email: http://localhost:3000/signup?token={verification_token}',
               'edwarddao20@gmail.com',
               [request.data['email']],
               fail_silently=False,
               )
          
          if ok:
               new_account = TaiKhoan.objects.create(
                    isAdmin = False,
                    isCustomer = True,
                    isActivated = False,
                    TenTaiKhoan = username,
                    MatKhau = password,
                    verification_token=verification_token,
               )
               new_account.save()

               new_user = KhachHang.objects.create(
                    TenKhachHang = fullname,
                    SoDienThoai = phone_number,
                    Email = email,
               )
               new_user.save()

               ma_tai_khoan = new_account.MaTaiKhoan
               ma_khach_hang = new_user.MaKhachHang

               new_user_account = TaiKhoanKhachHang.objects.create(
                    MaKhachHang = ma_khach_hang,
                    MaTaiKhoan = ma_tai_khoan,
               )
               new_user_account.save()
                              
               new_user_address = KhachHangDiaChi.objects.create(
                    MaKhachHang = ma_khach_hang,
                    MaQuan = district_code,
                    DiaChi = address,
               )
               new_user_address.save()
               
               return Response({'success': True, 'message': 'Đăng ký thành công!'})
          else: 
               return Response({'success': False, 'message': 'Đăng ký thất bại. Email không tồn tại!'})
     
     elif request.data.get('activate', False):

          cache_key = f'signup_data_{request.data["token"]}'
          cached_data = cache.get(cache_key)

          if not cached_data:
               return Response({'success': False, 'message': 'Cached data not found or expired.'})

          try:
               verification_token = cached_data.get('token')

               activate_account = TaiKhoan.objects.get(verification_token = verification_token)
               if activate_account:
                    activate_account.is_actived = True
                    activate_account.save()
                    return Response({'success': True, 'message': 'Tài khoản kích hoạt thành công!'})
               else:
                    return Response({'success': False, 'message': 'Tài khoản đã bị xoá trước khi được kích hoạt!'})
          except:
               return Response({'success': False, 'message': 'Lỗi hệ thống!!!'})

# Get all categories
@api_view(['GET'])
def getCategories(request):
     # Get data from database
     categories = LoaiMatHang.objects.all()
     # Convert from Queryset format to Json format, many = True because there are many data rows.
     serializers = LOAIMATHANG_Serializer(categories, many=True)    
     # Return Json format
     return Response(serializers.data)

# get all fishes both promotion or not promotion
@api_view(['GET'])
def getFish_all(request):
     # Get data from database
     fishes = MatHang.objects.all()
     # Convert from Queryset format to Json format, many = True because there are many data rows.
     serializers = MATHANG_Serializer(fishes, many=True)
     # Encode images before sending
     for item in serializers.data:
          # Encode HinhAnh1 before sending
          if item["HinhAnh1"]:
               with open (item["HinhAnh1"], 'rb') as file:
                    data = file.read()
                    base64_encoded_data = base64.b64encode(data).decode("utf-8")
                    item["HinhAnh1"] = base64_encoded_data
          # Encode HinhAnh2 before sending
          if item["HinhAnh2"]:
               with open (item["HinhAnh2"], 'rb') as file:
                    data = file.read()
                    base64_encoded_data = base64.b64encode(data).decode("utf-8")
                    item["HinhAnh2"] = base64_encoded_data
          # Encode HinhAnh3 before sending
          if item["HinhAnh3"]:
               with open (item["HinhAnh3"], 'rb') as file:
                    data = file.read()
                    base64_encoded_data = base64.b64encode(data).decode("utf-8")
                    item["HinhAnh3"] = base64_encoded_data
          # Encode HinhAnh4 before sending
          if item["HinhAnh4"]:
               with open (item["HinhAnh4"], 'rb') as file:
                    data = file.read()
                    base64_encoded_data = base64.b64encode(data).decode("utf-8")
                    item["HinhAnh4"] = base64_encoded_data     
     # Return Json format
     return Response(serializers.data)

# get all fishes not in promotion
@api_view(['GET'])
def getFish_no_promotion(request):
     # Get data from database
     fishes = MatHang.objects.filter(KhuyenMai=False)
     # Convert from Queryset format to Json format, many = True because there are many data rows.
     serializers = MATHANG_Serializer(fishes, many=True)
     # Encode images before sending
     for item in serializers.data:
          # Encode HinhAnh1 before sending
          if item["HinhAnh1"]:
               with open (item["HinhAnh1"], 'rb') as file:
                    data = file.read()
                    base64_encoded_data = base64.b64encode(data).decode("utf-8")
                    item["HinhAnh1"] = base64_encoded_data
          # Encode HinhAnh2 before sending
          if item["HinhAnh2"]:
               with open (item["HinhAnh2"], 'rb') as file:
                    data = file.read()
                    base64_encoded_data = base64.b64encode(data).decode("utf-8")
                    item["HinhAnh2"] = base64_encoded_data
          # Encode HinhAnh3 before sending
          if item["HinhAnh3"]:
               with open (item["HinhAnh3"], 'rb') as file:
                    data = file.read()
                    base64_encoded_data = base64.b64encode(data).decode("utf-8")
                    item["HinhAnh3"] = base64_encoded_data
          # Encode HinhAnh4 before sending
          if item["HinhAnh4"]:
               with open (item["HinhAnh4"], 'rb') as file:
                    data = file.read()
                    base64_encoded_data = base64.b64encode(data).decode("utf-8")
                    item["HinhAnh4"] = base64_encoded_data     
     # Return Json format
     return Response(serializers.data)

# Get all fishes in promotion
@api_view(['GET'])
def getFish_promotion(request):
     # Get data from database
     fishes = MatHang.objects.filter(KhuyenMai=True)
     # Convert from Queryset format to Json format, many = True because there are many data rows.
     serializers = MATHANG_Serializer(fishes, many=True)
     # Encode images before sending
     for item in serializers.data:
          # Encode HinhAnh1 before sending
          if item["HinhAnh1"]:
               with open (item["HinhAnh1"], 'rb') as file:
                    data = file.read()
                    base64_encoded_data = base64.b64encode(data).decode("utf-8")
                    item["HinhAnh1"] = base64_encoded_data
          # Encode HinhAnh2 before sending
          if item["HinhAnh2"]:
               with open (item["HinhAnh2"], 'rb') as file:
                    data = file.read()
                    base64_encoded_data = base64.b64encode(data).decode("utf-8")
                    item["HinhAnh2"] = base64_encoded_data
          # Encode HinhAnh3 before sending
          if item["HinhAnh3"]:
               with open (item["HinhAnh3"], 'rb') as file:
                    data = file.read()
                    base64_encoded_data = base64.b64encode(data).decode("utf-8")
                    item["HinhAnh3"] = base64_encoded_data
          # Encode HinhAnh4 before sending
          if item["HinhAnh4"]:
               with open (item["HinhAnh4"], 'rb') as file:
                    data = file.read()
                    base64_encoded_data = base64.b64encode(data).decode("utf-8")
                    item["HinhAnh4"] = base64_encoded_data    
     # Return Json format
     return Response(serializers.data)

# Get fish by fish's id
@api_view(['GET'])
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
        with open(data["HinhAnh1"], 'rb') as file:
            image_data = file.read()
            base64_encoded = base64.b64encode(image_data).decode("utf-8")
            data["HinhAnh1"] = base64_encoded

     if data.get("HinhAnh2"):
        with open(data["HinhAnh2"], 'rb') as file:
            image_data = file.read()
            base64_encoded = base64.b64encode(image_data).decode("utf-8")
            data["HinhAnh2"] = base64_encoded

     if data.get("HinhAnh3"):
        with open(data["HinhAnh3"], 'rb') as file:
            image_data = file.read()
            base64_encoded = base64.b64encode(image_data).decode("utf-8")
            data["HinhAnh3"] = base64_encoded

     if data.get("HinhAnh4"):
        with open(data["HinhAnh4"], 'rb') as file:
            image_data = file.read()
            base64_encoded = base64.b64encode(image_data).decode("utf-8")
            data["HinhAnh4"] = base64_encoded
     # Return as Json format
     return Response(data)

# Get wishlist of each customer
@api_view(['GET'])
def get_wishList(request, ma_khach_hang):
     # Get yeuthich
     yeuthichs = YeuThich.objects.filter(MaKhachHang=ma_khach_hang)
     # Serializing data
     serializers = YEUTHICH_Serializer(yeuthichs, many=True)
     # # Encode images before sending
     for item in serializers.data:
          # Encode HinhAnh1 before sending
          if item["ca_info"]["HinhAnh1"]:
               with open (item["ca_info"]["HinhAnh1"], 'rb') as file:
                    data = file.read()
                    base64_encoded_data = base64.b64encode(data).decode("utf-8")
                    item["ca_info"]["HinhAnh1"] = base64_encoded_data
          # Encode HinhAnh2 before sending
          if item["ca_info"]["HinhAnh2"]:
               with open (item["ca_info"]["HinhAnh2"], 'rb') as file:
                    data = file.read()
                    base64_encoded_data = base64.b64encode(data).decode("utf-8")
                    item["ca_info"]["HinhAnh2"] = base64_encoded_data
          # Encode HinhAnh3 before sending
          if item["ca_info"]["HinhAnh3"]:
               with open (item["ca_info"]["HinhAnh3"], 'rb') as file:
                    data = file.read()
                    base64_encoded_data = base64.b64encode(data).decode("utf-8")
                    item["ca_info"]["HinhAnh3"] = base64_encoded_data
          # Encode HinhAnh4 before sending
          if item["ca_info"]["HinhAnh4"]:
               with open (item["ca_info"]["HinhAnh4"], 'rb') as file:
                    data = file.read()
                    base64_encoded_data = base64.b64encode(data).decode("utf-8")
                    item["ca_info"]["HinhAnh4"] = base64_encoded_data    
     return Response(serializers.data)

# Add fish to wishlist
@api_view(['POST'])
def add_wishList(request):
     ma_khach_hang = request.data.get('userId')
     ma_ca = request.data.get('fishId')
     # Get KhachHang
     user_id = KhachHang.objects.get(MaKhachHang=ma_khach_hang)
     # Get fish
     fish = MatHang.objects.get(MaMatHang=ma_ca)
     # Check if fish exists or not
     check_fish = YeuThich.objects.filter(MaKhachHang=user_id, MaMatHang=fish)
     if check_fish:
          # Return message that annouces to client the problem in process
          return Response({'success': False, 'message': 'Cá đã tồn tại trong yêu thích'})
     else:
          # Add fish to Yeuthich table
          YeuThich.objects.create(
               MaKhachHang = user_id,
               MaMatHang = fish,
          )
          # Return message anoucing successful process
          return Response({'success': True, 'message': 'Thêm cá vào yêu thích thành công'})

# Remove fish from wishlist
@api_view(['DELETE'])
def remove_wishList(request, ma_khach_hang, ma_ca):
     try:
          # Get Yeuthich table     
          yeuthich_instance = YeuThich.objects.filter(MaKhachHang=ma_khach_hang, MaMatHang=ma_ca)
          yeuthich_instance.delete()
          return Response({'success': True, 'message': 'Xóa thành công cá khỏi yêu thích!'})
     except:
          return Response({'success': False, 'message': 'Xóa cá khỏi yêu thích thất bại!'})

# Delete all items in wishlist
@api_view(['DELETE'])
def delete_wishList(request, ma_khach_hang):
     print(ma_khach_hang)
     try:
          # Get Yeuthich table     
          yeuthich_instance = YeuThich.objects.filter(MaKhachHang=ma_khach_hang)
          yeuthich_instance.delete()
          return Response({'success': True, 'message': 'Xóa thành công tất cả cá khỏi yêu thích!'})
     except:
          return Response({'success': False, 'message': 'Xóa tất cả cá khỏi yêu thích thất bại!'})

# ----- OLD VERSION -----
# # Thực hiện mua cá - dọn giỏ hàng
#      # Nhận thông tin giỏ hàng - thực hiện insertion
# @api_view(['POST'])
# def addCart(request):
#      ma_ca = request.data.get('ma_ca')
#      ma_thucan = request.data.get('ma_thucan')
#      gia = request.data.get('gia')
#      so_luong_ca = request.data.get('so_luong_ca')
#      so_luong_ta = request.data.get('so_luong_thucan')
#      ma_tai_khoan = request.data.get('ma_tai_khoan')
#      # Lấy mã giỏ hàng
#      user_id = GIOHANG.objects.get(ma_tai_khoan=ma_tai_khoan)
#      try:
#           # Lấy tên tên cá
#           fish_name = CA_BETTA.objects.get(ma_ca=ma_ca)
          
#           # Kiểm tra cá đã tồn tại trong giỏ hàng
#           check_fish = GIOHANG_CA.objects.filter(ca_betta=fish_name, giohang=user_id)
#      except CA_BETTA.DoesNotExist:
#           pass

#      try:
#           # Lấy tên thức ăn
#           food_name = THUCAN.objects.get(ma_thucan=ma_thucan)
          
#           # Kiểm tra thức ăn đã tồn tại trong giỏ hàng
#           check_food = GIOHANG_THUCAN.objects.filter(thucan=food_name, giohang=user_id)
#      except THUCAN.DoesNotExist:
#           pass

#      if not ma_ca and not ma_thucan:
#           return Response({'success': False})
#      else:
#           if ma_ca and not check_fish:
#                so_luong_ton = CA_BETTA.objects.get(ma_ca=ma_ca).so_luong
#                if so_luong_ca > so_luong_ton:
#                     return Response({'success': False, 'message': 'vượt quá số lượng tồn'})
#                # Thêm cá vào GIOHANG_CA
#                new_giohang_ca = GIOHANG_CA.objects.create(
#                     giohang = user_id,
#                     ca_betta = fish_name,
#                     so_luong = so_luong_ca,
#                     gia = gia,
#                )
#                new_giohang_ca.save()

#                taikhoan = TAIKHOAN.objects.get(ma_tai_khoan=ma_tai_khoan)
#                giohang = GIOHANG.objects.get(ma_tai_khoan=taikhoan)
#                giohang_ca = GIOHANG_CA.objects.filter(giohang=giohang)
#                giohang_thucan = GIOHANG_THUCAN.objects.filter(giohang=giohang)
               
#                serializer1 = GIOHANG_CA_Serializer(giohang_ca, many=True)     
#                serializer2 = GIOHANG_THUCAN_Serializer(giohang_thucan, many=True)

#                merged_data = {'giohang_ca': serializer1.data, 'giohang_thucan': serializer2.data}

#                return Response({'data': merged_data})
#           elif ma_ca and check_fish:
#                return Response({'success': False, 'message': 'cá đã tồn tại'})
          
#           elif ma_thucan and not check_food:
#                so_luong_ton = THUCAN.objects.get(ma_thucan=ma_thucan).so_luong
#                if so_luong_ta > so_luong_ton:
#                     return Response({'success': False, 'message': 'vượt quá số lượng tồn'})
#                # Thêm thức ăn vào GIOHANG_THUCAN
#                new_giohang_thucan = GIOHANG_THUCAN.objects.create(
#                     giohang = user_id,
#                     thucan = food_name,
#                     so_luong = so_luong_ta,
#                     gia = gia,
#                )
#                new_giohang_thucan.save()

#                taikhoan = TAIKHOAN.objects.get(ma_tai_khoan=ma_tai_khoan)
#                giohang = GIOHANG.objects.get(ma_tai_khoan=taikhoan)
#                giohang_ca = GIOHANG_CA.objects.filter(giohang=giohang)
#                giohang_thucan = GIOHANG_THUCAN.objects.filter(giohang=giohang)
               
#                serializer1 = GIOHANG_CA_Serializer(giohang_ca, many=True)     
#                serializer2 = GIOHANG_THUCAN_Serializer(giohang_thucan, many=True)

#                merged_data = {'giohang_ca': serializer1.data, 'giohang_thucan': serializer2.data}

#                return Response({'data': merged_data})
#           elif ma_thucan and check_food:
#                return Response({'success': False, 'message': 'thức ăn đã tồn tại'})
#           else:
#                return Response({'success': False})
     
# # Xóa một GIOHANG_CA
# @api_view(['POST'])
# def removeCart(request):
#      ma_tai_khoan = request.data.get('ma_tai_khoan')
#      ma_item = request.data.get('ma_item')
#      loai_item = request.data.get('loai_item')

#      if loai_item != "thucan":
#           # Lấy GIOHANG_CA instance
#           tai_khoan = GIOHANG.objects.get(ma_tai_khoan=ma_tai_khoan)
#           fish_name_remove = CA_BETTA.objects.get(ma_ca=ma_item)
#           giohang_ca_instance = GIOHANG_CA.objects.get(ca_betta=fish_name_remove, giohang=tai_khoan)
#           giohang_ca_instance.delete()

#           return Response({'success': True, 'message': 'Xóa thành công sản phẩm!'})
     
#      if loai_item != "ca":
#           # Lấy GIOHANG_THUCAN instance
#           tai_khoan = GIOHANG.objects.get(ma_tai_khoan=ma_tai_khoan)
#           food_name_remove = THUCAN.objects.get(ma_thucan=ma_item)
#           giohang_thucan_instance = GIOHANG_THUCAN.objects.get(thucan=food_name_remove, giohang=tai_khoan)
#           giohang_thucan_instance.delete()

#           return Response({'success': True, 'message': 'Xóa thành công sản phẩm!'})
     
# # Cập nhật GIOHANG_CA - khi có thay đổi trong giỏ hàng
# @api_view(['POST'])
# def updateCart(request):
#      ma_tai_khoan = request.data.get('ma_tai_khoan')
#      ma_ca = request.data.get('ma_ca')
#      ma_thucan = request.data.get('ma_thucan')
#      action = request.data.get('increase')
#      if ma_ca != None:
#           # Tăng số lượng cá
#           if action == True:
#                tai_khoan = GIOHANG.objects.get(ma_tai_khoan=ma_tai_khoan)
#                fish_name_update = CA_BETTA.objects.get(ma_ca=ma_ca)
#                soluong = GIOHANG_CA.objects.get(ca_betta=fish_name_update, giohang=tai_khoan)
               
#                if soluong.so_luong >= fish_name_update.so_luong:
#                     return Response({'success': False, 'message': 'vượt số lượng tồn'})
               
#                soluong.so_luong += 1

#                soluong.save()
#                return Response({'success': True})
          
#           # Giảm số lượng cá
#           elif action == False:
#                tai_khoan = GIOHANG.objects.get(ma_tai_khoan=ma_tai_khoan)
#                fish_name_update = CA_BETTA.objects.get(ma_ca=ma_ca)
#                soluong = GIOHANG_CA.objects.get(ca_betta=fish_name_update, giohang=tai_khoan)

#                if soluong.so_luong == 0:
#                     return Response({'success': False})
#                else:
#                     soluong.so_luong -= 1
#                     if soluong.so_luong == 0:
#                          soluong.delete()
#                     else:
#                          soluong.save()
               
#                return Response({'success': True})
          
#      if ma_thucan != None:
#           # Tăng số lượng thức ăn
#           if action == True:
#                tai_khoan = GIOHANG.objects.get(ma_tai_khoan=ma_tai_khoan)
#                food_name_update = THUCAN.objects.get(ma_thucan=ma_thucan)
#                soluong = GIOHANG_THUCAN.objects.get(thucan=food_name_update, giohang=tai_khoan)

#                if soluong.so_luong >= food_name_update.so_luong:
#                     return Response({'success': False, 'message': 'vượt số lượng tồn'})
               
#                soluong.so_luong += 1

#                soluong.save()
#                return Response({'success': True})
          
#           # Giảm số lượng thức ăn
#           elif action == False:
#                tai_khoan = GIOHANG.objects.get(ma_tai_khoan=ma_tai_khoan)
#                food_name_update = THUCAN.objects.get(ma_thucan=ma_thucan)
#                soluong = GIOHANG_THUCAN.objects.get(thucan=food_name_update, giohang=tai_khoan)
               
#                if soluong.so_luong == 0:
#                     return Response({'success': False})
#                else:
#                     soluong.so_luong -= 1
#                     if soluong.so_luong == 0:
#                          soluong.delete()
#                     else:
#                          soluong.save()
               
#                return Response({'success': True})
     
# # Truy vấn giỏ hàng - dành cho việc sau khi đăng nhập/ đăng xuất
# @api_view(['POST'])
# def selectCart(request):
#      ma_tai_khoan = request.data.get('ma_tai_khoan')
#      if ma_tai_khoan == None:
#           return Response({'success': False})
     
#      taikhoan = TAIKHOAN.objects.get(ma_tai_khoan=ma_tai_khoan)
#      giohang = GIOHANG.objects.get(ma_tai_khoan=taikhoan)
#      giohang_ca = GIOHANG_CA.objects.filter(giohang=giohang)
#      giohang_thucan = GIOHANG_THUCAN.objects.filter(giohang=giohang)

#      serializer1 = GIOHANG_CA_Serializer(giohang_ca, many=True)
#      serializer2 = GIOHANG_THUCAN_Serializer(giohang_thucan, many=True)
     
#      return Response({'success': True, 'data1': serializer1.data, 'data2': serializer2.data})


     
# # api for check out
# @api_view(['POST'])
# def check_out(request):
#      ma_ca = [x for x in request.data.get('ma_ca') if x != None]
#      ma_thucan = [x for x in request.data.get('ma_thucan') if x != None]
#      ma_tai_khoan = request.data.get('ma_tai_khoan')

#      # Tạo tổng tiền & tổng số lượng
#      tong_tien = float(0)
#      tong_so_luong = int(0)

#      # Lấy mã giỏ hàng
#      user_id = GIOHANG.objects.get(ma_tai_khoan=ma_tai_khoan)

#      # Xử lý cá
#      for i in ma_ca:
#           fish_name = CA_BETTA.objects.get(ma_ca=i)

#           # Kiểm tra cá đã tồn tại trong giỏ hàng
#           fish = GIOHANG_CA.objects.filter(ca_betta=fish_name, giohang=user_id)
#           tong_so_luong += fish[0].so_luong
#           tong_tien += float(fish[0].so_luong * fish[0].gia)
#           # Cập nhật số lượng tồn
#           fish_name.so_luong -= fish[0].so_luong
#           fish_name.save()

#      # Xử lý thức ăn
#      for i in ma_thucan:
#           food_name = THUCAN.objects.get(ma_thucan=i)

#           # Kiểm tra cá đã tồn tại trong giỏ hàng
#           food = GIOHANG_THUCAN.objects.filter(thucan=food_name, giohang=user_id)

#           tong_so_luong += food[0].so_luong
#           tong_tien += float(food[0].so_luong * food[0].gia)
#           # Cập nhật số lượng tồn
#           food_name.so_luong -= food[0].so_luong
#           food_name.save()
     
#      new_nguoi_dung = NGUOIDUNG.objects.get(tai_khoan=ma_tai_khoan)
#      # Tạo hóa đơn
#      new_hoa_don = HOADON.objects.create(
#           ngay=timezone.now(),
#           tong_sl_mua = tong_so_luong,
#           tong_tien = tong_tien,
#           ma_nguoi_dung=new_nguoi_dung
#      )
#      new_hoa_don.save()
     
#      # Tạo cthd_ca và thêm từng hạng mục vào
#      for i in ma_ca:
#           fish_name = CA_BETTA.objects.get(ma_ca=i)


#           fish = GIOHANG_CA.objects.filter(ca_betta=fish_name, giohang=user_id)
#           new_cthds = CTHD_CA.objects.create(
#                ma_hoa_don = new_hoa_don,
#                ma_ca = fish_name,
#                soluong = fish[0].so_luong,
#           )

#           # Xóa hết cá trong giỏ hàng
#           fish.delete()
     
#      # Tạo cthd_thucan và thêm từng hạng mục vào
#      for i in ma_thucan:
#           food_name = THUCAN.objects.get(ma_thucan=i)

#           food = GIOHANG_THUCAN.objects.filter(thucan=food_name, giohang=user_id)

#           new_cthds = CTHD_THUCAN.objects.create(
#                ma_hoa_don = new_hoa_don,
#                ma_thucan = food_name,
#                soluong = food[0].so_luong,
#           )

#           # Xóa hết cá trong giỏ hàng
#           food.delete()

#      # Trả phản hồi     
#      return Response({'success': True, 'message': 'Đã tạo hóa đơn!', 'ma_hoa_don': new_hoa_don.ma_hoa_don})

# @api_view(['GET'])
# def export_hoadon_pdf(request, ma_hoa_don):
    
#      # Lấy đối tượng HOADON từ cơ sở dữ liệu
#      hoadon = get_object_or_404(HOADON, ma_hoa_don=ma_hoa_don)
#      ma_nguoi_dung_str = str(hoadon.ma_nguoi_dung)
#      ma_nguoi_dung_lst = list(ma_nguoi_dung_str.split(' - '))
#      user_id = int(ma_nguoi_dung_lst[0])

#      nguoidung = NGUOIDUNG.objects.get(ma_nguoi_dung=user_id)     
     
#      # Lấy các đối tượng cá trong cthd thuộc về hóa đơn (tên + số lượng)
#      fish_dict = {}
#      cthd_id = CTHD_CA.objects.filter(ma_hoa_don=ma_hoa_don).values('ma_ca', 'soluong')
#      index_ca = 0
#      for i in cthd_id:
#           info_list = []          
#           # Lấy tên cá
#           fish_name = CA_BETTA.objects.filter(ma_ca=i['ma_ca']).values('ten_ca')
#           info_list.append(fish_name[0]['ten_ca'])
#           # Lấy số lượng mua
#           info_list.append(i['soluong'])
#           # Đánh số thứ tự
#           info_list.append(index_ca)
#           index_ca += 1

#           fish_dict[i['ma_ca']] = info_list

#      # Lấy các đối tượng thức ăn trong cthd thuộc về hóa đơn (tên + số lượng)
#      food_dict = {}
#      cthd_food = CTHD_THUCAN.objects.filter(ma_hoa_don=ma_hoa_don).values('ma_thucan', 'soluong')
#      index_thucan = 0
#      for i in cthd_food:
#           info_list = []
#           # Lấy tên thức ăn
#           food_name = THUCAN.objects.filter(ma_thucan=i['ma_thucan']).values('ten_thucan')
#           info_list.append(food_name[0]['ten_thucan'])
#           # Lấy số lượng mua
#           info_list.append(i['soluong'])
#           # Đánh số thứ tự
#           info_list.append(index_thucan)
#           index_thucan += 1

#           food_dict[i['ma_thucan']] = info_list
     
#      # In hóa đơn
#      # Tạo đối tượng HttpResponse với kiểu nội dung là application/pdf
#      response = HttpResponse(content_type='application/pdf')

#      # Thiết lập header để tạo tên file khi tải về
#      response['Content-Disposition'] = f'attachment; filename="hoadon_{ma_hoa_don}.pdf"'

#      # Đường dẫn đến font trên hệ thống
#      font_path = 'D:/UIT/HK I 2023-2024/SE347.O11/UIT/web_app/new_version/backend/fonts/times.ttf'
#      # Đăng ký font
#      pdfmetrics.registerFont(TTFont('times', font_path))

#      # Tạo đối tượng PDF sử dụng ReportLab
#      p = canvas.Canvas(response)
#      p.setFont("times", 12)
     
#      # Vẽ nội dung PDF từ dữ liệu
#      p.drawString(100, 800, f'THÔNG TIN NGƯỜI DÙNG')
#      p.drawString(100, 780, f'Họ tên: {nguoidung.ho_ten}')
#      p.drawString(100, 760, f'Địa chỉ: {nguoidung.dia_chi}')
#      p.drawString(100, 740, f'Số điện thoại: {nguoidung.sdt}')

#      p.drawString(100, 680, f'THÔNG TIN HÓA ĐƠN')
#      p.drawString(100, 660, f'Mã hóa đơn: {hoadon.ma_hoa_don}')
#      p.drawString(100, 640, f'Ngày: {hoadon.ngay}')
#      p.drawString(100, 620, f'Tình trạng: {hoadon.get_tinh_trang_display()}')
#      p.drawString(100, 600, f'Tổng số lượng mua: {hoadon.tong_sl_mua}')
#      p.drawString(100, 580, f'Tổng tiền: {hoadon.tong_tien}')
#      p.showPage()     
#      # Đặt lại cài đặt font cho trang mới
#      p.setFont("times", 12)

#      # Thêm thông tin từng cá mua vào pdf - thêm vào trang sau
#      count_ca = 0
#      count_stt_ca = 0
#      while count_ca < index_ca:
#           p.drawString(100, 800, f'CHI TIẾT CÁ')
#           p.drawString(100, 750, f'TÊN CÁ')
#           p.drawString(450, 750, f'SỐ LƯỢNG')
#           default_line = 700
#           for ten_ca, so_luong, stt in fish_dict.values():
#                if stt == count_stt_ca:
#                     p.drawString(100, default_line, f'{ten_ca}')
#                     p.drawString(500, default_line, f'{so_luong}')
#                     default_line -= 20
#                     count_ca += 1
#                     count_stt_ca += 1
#                     if count_ca == index_ca:
#                          break
#                     if default_line <= 100:
#                          p.showPage()
#                          # Đặt lại cài đặt font cho trang mới
#                          p.setFont("times", 12)
#                          break
     
#      # In hết thông tin cá = chuyển qua in thông tin thức ăn
#      if index_ca != 0:
#           p.showPage()
#           # Đặt lại cài đặt font cho trang mới
#           p.setFont("times", 12)
     
#      # Thêm thông tin thức ăn vào pdf
#      count_thucan = 0
#      count_stt_thucan = 0
#      while count_thucan < index_thucan:
#           p.drawString(100, 800, f'CHI TIẾT THỨC ĂN')
#           p.drawString(100, 750, f'TÊN THỨC ĂN')
#           p.drawString(450, 750, f'SỐ LƯỢNG')
#           default_line = 700
#           for ten_thucan, so_luong, stt in food_dict.values():
#                if stt == count_stt_thucan:
#                     p.drawString(100, default_line, f'{ten_thucan}')
#                     p.drawString(500, default_line, f'{so_luong}')
#                     default_line -= 20
#                     count_thucan += 1
#                     count_stt_thucan += 1
#                     if count_thucan == index_thucan:
#                          break
#                     if default_line <= 100:
#                          p.showPage()
#                          # Đặt lại cài đặt font cho trang mới
#                          p.setFont("times", 12)
#                          break

#      # In hết thông tin thức ăn thì hết trang và lưu pdf
#      p.showPage()
#      p.save()

#      return response

# @api_view(['POST'])
# def getReports(request):
#      month, year = request.data.get('month'), request.data.get('year')
     
#      try:
#           report_valid = BCDS.objects.filter(thang=month, nam=year)
#           if report_valid:
#                report_del = BCDS.objects.get(thang=month, nam=year)
#                report_del.delete()

#                report_upt = BCDS.objects.create(
#                     thang = month,
#                     nam = year,
#                )
#                report_upt.save()

#                serializers = BCDS_Serializer(report_upt)
#                return Response({'success': True, 'message': 'Đã tìm thấy BCDS', 'serializers': serializers.data})
#           else:
#                new_report = BCDS.objects.create(
#                thang = month,
#                nam = year,
#                )
#                new_report.save()

#                serializers = BCDS_Serializer(new_report)

#                return Response({'success': True, 'message': 'Đã tạo BCDS', 'serializers': serializers.data})
#      except:
#           return Response({'success': False, 'message': 'Lỗi hệ thống!!!'})

# @api_view(['POST'])
# def get_user_info(request):
#      user_id = request.data.get('user_id')
#      user = NGUOIDUNG.objects.get(ma_nguoi_dung=user_id)
#      serializers = NGUOIDUNG_Serializer(user)

#      # Trả về dạng Json
#      return Response(serializers.data)

# @api_view(['POST'])
# def user_info(request):
#      user_id = request.data.get('user_id')
#      full_name = request.data.get('full_name')
#      phone_number = request.data.get('phone_number')
#      address = request.data.get('address')

#      update_user = NGUOIDUNG.objects.get(ma_nguoi_dung=user_id)

#      if full_name != '' and full_name != update_user.ho_ten:
#           update_user.ho_ten = full_name

#      if phone_number != '' and phone_number != update_user.sdt:
#           update_user.sdt = phone_number

#      if address != '' and address != update_user.dia_chi:
#           update_user.dia_chi = address

#      update_user.save()

#      return Response({'success': True})

# # Xử lý giỏ hàng yêu thích

# # Xử lý mua bán rong rêu, thức ăn
# @api_view(['GET'])
# def getFoods(request):
#      # Lấy dữ liệu từ database
#      foods = THUCAN.objects.all()
#      # Chuyển từ dạng Queryset sang định dạng Json, many = True vì có nhiều dòng dữ liệu
#      serializers = THUCAN_Serializer(foods, many=True)
#      # Trả về dạng Json
#      return Response({'success': True, 'data': serializers.data})

# # Lấy một thức ăn theo ma_thucan
# @api_view(['POST'])
# def get_one_food(request):
#      ma_thucan = request.data.get('ma_thucan')
#      thucan = THUCAN.objects.get(ma_thucan=ma_thucan)
#      serializers = THUCAN_Serializer(thucan, many=False)
#      return Response({'success': True, 'data': serializers.data})

# # Thêm thức ăn vào danh mục yêu thích 
# @api_view(['POST'])
# def add_food_wishlist(request):
#      ma_tai_khoan = request.data.get('ma_tai_khoan')

#      ma_thucan = request.data.get('ma_thucan')

#      # Lấy YEUTHICH
#      user_id = YEUTHICH.objects.get(ma_tai_khoan=ma_tai_khoan)

#      # Lấy tên tên cá
#      food_name = THUCAN.objects.get(ma_thucan=ma_thucan)
#      # Kiểm tra cá đã tồn tại trong wishlist hay không ?
#      check_food = YEUTHICH_DANHMUC_THUCAN.objects.filter(ma_thucan=food_name, ma_yeuthich=user_id)
#      if check_food:
#           return Response({'success': False, 'message': 'thức ăn đã tồn tại'})
#      else:
#           # Thêm cá vào YEUTHICH_DANHMUC_CA
#           new_yeuthich_thucan = YEUTHICH_DANHMUC_THUCAN.objects.create(
#                ma_yeuthich = user_id,
#                ma_thucan = food_name,
#           )

#           taikhoan = TAIKHOAN.objects.get(ma_tai_khoan=ma_tai_khoan)
#           yeuthich = YEUTHICH.objects.get(ma_tai_khoan=taikhoan)
#           yeuthich_danhmuc_thucan = YEUTHICH_DANHMUC_THUCAN.objects.filter(ma_yeuthich=yeuthich, ma_thucan=ma_thucan)
#           serializer = YEUTHICH_DANHMUC_THUCAN_Serializer(yeuthich_danhmuc_thucan, many=True)
#           return Response(serializer.data)
     
#      return Response({'success': True})
