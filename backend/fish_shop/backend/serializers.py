from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import *

# Write serializers below


# Serializer 1
class LOAIMATHANG_Serializer(ModelSerializer):
    class Meta:
        model = LoaiMatHang
        fields = "__all__"


# Serializer 2
class MATHANG_Serializer(ModelSerializer):
    ma_loai_ca_info = LOAIMATHANG_Serializer(source="MaLoaiMatHang", read_only=True)

    class Meta:
        model = MatHang
        fields = "__all__"


# Serializer 3
class KHACHHANG_Serializer(ModelSerializer):
    class Meta:
        model = KhachHang
        fields = "__all__"


# Serialize 4
class YEUTHICH_Serializer(ModelSerializer):
    ca_info = MATHANG_Serializer(source="MaMatHang", read_only=True)

    class Meta:
        model = YeuThich
        fields = "__all__"


# # Serializer 5
class GIOHANG_Serializer(ModelSerializer):
    class Meta:
        model = GioHang
        fields = "__all__"


# # Serializer 6
class CT_GIOHANG_Serializer(ModelSerializer):
    ca_info = MATHANG_Serializer(source="MaMatHang", read_only=True)

    class Meta:
        model = ChiTietGioHang
        fields = "__all__"


# # Serializer 7
class TAIKHOAN_Serializer(ModelSerializer):
    class Meta:
        model = TaiKhoan
        fields = "__all__"


# # Serializer 8
class NGUOIDUNG_Serializer(ModelSerializer):
    class Meta:
        model = KhachHang
        fields = "__all__"


# # Serializer 9
class QUAN_Serializer(ModelSerializer):
    class Meta:
        model = Quan
        fields = "__all__"


# # Serializer 10
class DAILY_Serializer(ModelSerializer):
    class Meta:
        model = DaiLy
        fields = "__all__"


# # Serializer 11
class NGUOIDUNG_DIACHI_Serializer(ModelSerializer):
    quan_info = QUAN_Serializer(source="MaQuan", read_only=True)

    class Meta:
        model = KhachHangDiaChi
        fields = "__all__"


# # Serializer 12
class QUAN_Serializer(ModelSerializer):
    class Meta:
        model = Quan
        fields = "__all__"


# Serializer 13
class LimitedKHACHHANG_Serializer(ModelSerializer):
    class Meta:
        model = KhachHang
        fields = ["MaKhachHang", "TenKhachHang", "HinhAnh"]


# Serialize 14
class DANHGIA_Serializer(ModelSerializer):
    khachhang_info = LimitedKHACHHANG_Serializer(source="MaKhachHang", read_only=True)

    class Meta:
        model = DanhGia
        fields = "__all__"


# Serialize 15
class DANHGIA_ADMIN_Serializer(ModelSerializer):
    class Meta:
        model = DanhGia
        fields = "__all__"


# Serialize 16
class MATHANG_ADMIN_Serializer(ModelSerializer):
    danhgia = DANHGIA_ADMIN_Serializer(source="danhgia_set", many=True, read_only=True)

    class Meta:
        model = MatHang
        fields = "__all__"


# Serializer 17
class KHACHHANG_DIACHI_ADMIN_Serializer(ModelSerializer):
    class Meta:
        model = KhachHangDiaChi
        fields = ["DiaChi"]


# Serializer 18
class KHACHHANG_THANHTOAN_ADMIN_Serializer(ModelSerializer):
    class Meta:
        model = LichSuThanhToan
        fields = "__all__"


# Serializer 19
class KHACHHANG_ADMIN_Serializer(ModelSerializer):
    diachi = KHACHHANG_DIACHI_ADMIN_Serializer(
        source="khachhangdiachi_set", many=True, read_only=True
    )
    danhgia = DANHGIA_ADMIN_Serializer(source="danhgia_set", many=True, read_only=True)
    thanhtoan = KHACHHANG_THANHTOAN_ADMIN_Serializer(
        source="lichsuthanhtoan_set", many=True, read_only=True
    )

    class Meta:
        model = KhachHang
        fields = "__all__"


# Serializer 20
class LimitedMATHANG_Serializer(ModelSerializer):
    class Meta:
        model = MatHang
        fields = ["MaMatHang", "TenMatHang", "HinhAnh1"]


# Serializer 21
class LICHSU_THANHTOAN_Serializer(ModelSerializer):

    class Meta:
        model = LichSuThanhToan
        fields = ["MaDonHang", "MaPhuongThuc", "ThoiDiem"]


# Serializer 22
class CHITIET_THANHTOAN_Serializer(ModelSerializer):
    MaMatHang = LimitedMATHANG_Serializer()

    class Meta:
        model = ChiTietThanhToan
        fields = "__all__"
