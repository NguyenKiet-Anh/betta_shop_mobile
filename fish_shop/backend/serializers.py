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


# ----- OLD VERSION -----
# from rest_framework.serializers import ModelSerializer
# from rest_framework import serializers
# from .models import LOAICA, CA_BETTA, NGUOIDUNG, TAIKHOAN, GIOHANG, HOADON, CTHD_CA, CTHD_THUCAN, BCDS, GIOHANG_CA, THUCAN, YEUTHICH, YEUTHICH_DANHMUC_CA, YEUTHICH_DANHMUC_THUCAN, GIOHANG_THUCAN







# # Serializer 4
# class TAIKHOAN_Serializer(ModelSerializer):
#     class Meta:
#         model = TAIKHOAN
#         fields = '__all__'

# # Serializer 5
# class GIOHANG_Serializer(ModelSerializer):
#     class Meta:
#         model = GIOHANG
#         fields = '__all__'

# # Serializer 6
# class HOADON_Serializer(ModelSerializer):
#     class Meta:
#         model = HOADON
#         fields = '__all__'

# # Serializer 7
# class CTHD_CA_Serializer(ModelSerializer):
#     class Meta:
#         model = CTHD_CA
#         fields = '__all__'

# # Serializer 7.1
# class CTHD_CA_Serializer(ModelSerializer):
#     class Meta:
#         model = CTHD_THUCAN
#         fields = '__all__'

# # Serializer 8
# class BCDS_Serializer(ModelSerializer):
#     class Meta:
#         model = BCDS
#         fields = '__all__'

# class CA_BETTA_Serializer_for_GIOHANG_CA(ModelSerializer):
#     class Meta:
#         model = CA_BETTA
#         fields = ['ten_ca', 'gia', 'hinh_anh1', 'hinh_anh2', 'hinh_anh3', 'hinh_anh4']

# class GIOHANG_CA_Serializer(ModelSerializer):
#     ca_betta_info = CA_BETTA_Serializer_for_GIOHANG_CA(source='ca_betta', read_only=True)
#     class Meta:
#         model = GIOHANG_CA
#         fields = '__all__'

# class THUCAN_Serializer_for_GIOHANG_THUCAN(ModelSerializer):
#     class Meta:
#         model = THUCAN
#         fields = ['ten_thucan', 'gia', 'hinhanh1', 'hinhanh2', 'hinhanh3']

# class GIOHANG_THUCAN_Serializer(ModelSerializer):
#     thucan_info = THUCAN_Serializer_for_GIOHANG_THUCAN(source='thucan', read_only=True)
#     class Meta:
#         model = GIOHANG_THUCAN
#         fields = '__all__'

# class THUCAN_Serializer(ModelSerializer):
#     class Meta:
#         model = THUCAN
#         fields = '__all__'
