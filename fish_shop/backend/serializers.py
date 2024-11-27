from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import *
# Write serializers below

# Serializer 1
class LOAIMATHANG_Serializer(ModelSerializer):
    class Meta:
        model = LoaiMatHang
        fields = '__all__'

# Serializer 2
class MATHANG_Serializer(ModelSerializer):
    ma_loai_ca_info = LOAIMATHANG_Serializer(source='MaLoaiMatHang', read_only=True)
    class Meta:
        model = MatHang
        fields = '__all__'

# Serializer 3
class KHACHHANG_Serializer(ModelSerializer):
    class Meta:
        model = KhachHang
        fields = '__all__'

# Serialize 4
class YEUTHICH_Serializer(ModelSerializer):
    ca_info = MATHANG_Serializer(source='MaMatHang', read_only=True)
    class Meta:
        model = YeuThich
        fields = '__all__'

# # Serializer 5
class GIOHANG_Serializer(ModelSerializer):
    class Meta:
        model = GioHang
        fields = '__all__'

# # Serializer 6
class CT_GIOHANG_Serializer(ModelSerializer):
    ca_info = MATHANG_Serializer(source='MaMatHang', read_only=True)
    class Meta:
        model = ChiTietGioHang
        fields = '__all__'

# # Serializer 7
class TAIKHOAN_Serializer(ModelSerializer):
    class Meta:
        model = TaiKhoan
        fields = '__all__'

# # Serializer 8
class NGUOIDUNG_Serializer(ModelSerializer):
    class Meta:
        model = KhachHang
        fields = '__all__'

# # Serializer 9
class QUAN_Serializer(ModelSerializer):
    class Meta:
        model = Quan
        fields = '__all__'

# # Serializer 10
class NGUOIDUNG_DIACHI_Serializer(ModelSerializer):
    quan_info = QUAN_Serializer(source='MaQuan', read_only=True)
    class Meta:
        model = KhachHangDiaChi
        fields = '__all__'

# # Serializer 11
class QUAN_Serializer(ModelSerializer):
    class Meta:
        model = Quan
        fields = '__all__'