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
class NGUOIDUNG_Serializer(ModelSerializer):
    class Meta:
        model = KhachHang
        fields = '__all__'
        
# ----- OLD VERSION -----
# from rest_framework.serializers import ModelSerializer
# from rest_framework import serializers
# from .models import LOAICA, CA_BETTA, NGUOIDUNG, TAIKHOAN, GIOHANG, HOADON, CTHD_CA, CTHD_THUCAN, BCDS, GIOHANG_CA, THUCAN, YEUTHICH, YEUTHICH_DANHMUC_CA, YEUTHICH_DANHMUC_THUCAN, GIOHANG_THUCAN







# # Serializer 4
# class TAIKHOAN_Serializer(ModelSerializer):
#     class Meta:
#         model = TAIKHOAN
#         fields = '__all__'



# # Serializer 6
# class HOADON_Serializer(ModelSerializer):
#     class Meta:
#         model = HOADON
#         fields = '__all__'



# # Serializer 7.1
# class CTHD_CA_Serializer(ModelSerializer):
#     class Meta:
#         model = CTHD_THUCAN
#         fields = '__all__'
