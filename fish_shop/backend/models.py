import os
from django.db import models
from django.urls import reverse
import operator
# Create your models here.

# Table 1
class Quan(models.Model):
    MaQuan = models.SmallAutoField(primary_key=True)
    TenQuan = models.CharField(max_length=100)
    TenThanhPho = models.CharField(max_length=100)

    class Meta:
        db_table = 'QUAN'

# Table 2
class LoaiDaiLy(models.Model):
    MaLoaiDaiLy = models.SmallAutoField(primary_key=True)
    TenLoaiDaiLy = models.CharField(max_length=100, unique=True)
    SoTienNoToiDa = models.DecimalField(max_digits=12, decimal_places=4, default=0)

    class Meta:
        db_table = 'LOAIDAILY'

# Table 3
class DaiLy(models.Model):
    MaDaiLy = models.SmallAutoField(primary_key=True)
    MaLoaiDaiLy = models.ForeignKey(LoaiDaiLy, on_delete=models.SET_NULL, null=True)
    TenDaiLy = models.CharField(max_length=100, unique=True)
    SoDienThoai = models.CharField(max_length=20, unique=True)
    NgayTiepNhan = models.DateField(auto_now_add=True)
    SoTienNo = models.DecimalField(max_digits=12, decimal_places=4, default=0)
    HinhAnh = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        db_table = 'DAILY'

# Table 4
class LoaiMatHang(models.Model):
    MaLoaiMatHang = models.SmallAutoField(primary_key=True)
    TenLoaiMatHang = models.CharField(max_length=100, unique=True)

    class Meta:
        db_table = 'LOAIMATHANG'

# Table 5
class MatHang(models.Model):
    # Class for gender choices
    class Gioitinh(models.TextChoices):
        Duc = ('M', 'đực')
        Cai = ('F', 'cái')
    MaMatHang = models.SmallAutoField(primary_key=True)
    TenMatHang = models.CharField(max_length=100, unique=True)
    SoLuongTon = models.IntegerField(default=0)
    Dongia = models.DecimalField(max_digits=12, decimal_places=4)
    KhuyenMai = models.BooleanField(default=False)
    GiaKhuyenMai = models.DecimalField(max_digits=12, decimal_places=4, default=0)
    TenDVT = models.CharField(max_length=50)
    Gioitinh = models.CharField(max_length=1, choices=Gioitinh.choices, default=Gioitinh.Duc)
    HinhAnh1 = models.CharField(max_length=200, blank=True, null=True)
    HinhAnh2 = models.CharField(max_length=200, blank=True, null=True)
    HinhAnh3 = models.CharField(max_length=200, blank=True, null=True)
    HinhAnh4 = models.CharField(max_length=200, blank=True, null=True)
    MaDaiLy = models.ForeignKey(DaiLy, on_delete=models.CASCADE)
    MaLoaiMatHang = models.ForeignKey(LoaiMatHang, on_delete=models.CASCADE)

    class Meta:
        db_table = 'MATHANG'

# Table 6
class TaiKhoan(models.Model):
    MaTaiKhoan = models.SmallAutoField(primary_key=True)
    isAdmin = models.BooleanField(default=False)
    isCustomer = models.BooleanField(default=True)
    TenTaiKhoan = models.CharField(max_length=100, unique=True)
    MatKhau = models.CharField(max_length=200)
    isActivated = models.BooleanField(default=False)
    
    # status = models.BooleanField(default=False)
    verification_token = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'TAIKHOAN'

# Table 7
class KhachHang(models.Model):
    MaKhachHang = models.SmallAutoField(primary_key=True)
    TenKhachHang = models.CharField(max_length=100)
    SoDienThoai = models.CharField(max_length=20, unique=True)
    Email = models.TextField(blank=True, null=True)
    class Meta:
        db_table = 'KHACHHANG'

# Table 8
class TaiKhoanKhachHang(models.Model):
    MaKhachHang = models.ForeignKey(KhachHang, on_delete=models.CASCADE)
    MaTaiKhoan = models.ForeignKey(TaiKhoan, on_delete=models.CASCADE)

    class Meta:
        db_table = 'TAIKHOAN_KHACHHANG'
        unique_together = ('MaKhachHang', 'MaTaiKhoan')  # Composite Primary Key

# Table 9
class KhachHangDiaChi(models.Model):
    MaKhachHang = models.ForeignKey(KhachHang, on_delete=models.CASCADE)
    MaQuan = models.ForeignKey(Quan, on_delete=models.CASCADE)
    DiaChi = models.CharField(max_length=200)

    class Meta:
        db_table = 'KHACHHANG_DIACHI'
        unique_together = ('MaKhachHang', 'MaQuan')

# Table 10
class PhieuXuatHang(models.Model):
    MaPhieuXuat = models.SmallAutoField(primary_key=True)
    NgayLapPhieu = models.DateField(auto_now_add=True)
    TongTien = models.DecimalField(max_digits=12, decimal_places=4)
    MaDaiLy = models.ForeignKey(DaiLy, on_delete=models.CASCADE)
    MaKhachHang = models.ForeignKey(KhachHang, on_delete=models.CASCADE)

    class Meta:
        db_table = 'PHIEUXUATHANG'

# Table 11
class ChiTietPhieuXuatHang(models.Model):
    MaCT_PXH = models.AutoField(primary_key=True)
    MaPhieuXuat = models.ForeignKey(PhieuXuatHang, on_delete=models.CASCADE)
    MaMatHang = models.ForeignKey(MatHang, on_delete=models.SET_NULL, null=True)
    SoLuongXuat = models.IntegerField(default=0)

    class Meta:
        db_table = 'CHITIET_PXH'

# Table 12
class YeuThich(models.Model):
    MaKhachHang = models.ForeignKey(KhachHang, on_delete=models.CASCADE)
    MaMatHang = models.ForeignKey(MatHang, on_delete=models.CASCADE)

    class Meta:
        db_table = 'YEUTHICH'
        unique_together = ('MaKhachHang', 'MaMatHang')

# Table 13
class GioHang(models.Model):
    MaGioHang = models.AutoField(primary_key=True)
    MaKhachHang = models.ForeignKey(KhachHang, on_delete=models.CASCADE)
    TongTien = models.DecimalField(max_digits=12, decimal_places=4, default=0.0000)

    class Meta:
        db_table = 'GIOHANG'

# Table 14
class ChiTietGioHang(models.Model):
    MaGioHang = models.ForeignKey('GioHang', on_delete=models.CASCADE)
    MaMatHang = models.ForeignKey('MatHang', on_delete=models.CASCADE)
    SoLuong = models.IntegerField(default=0)
    ThanhTien = models.DecimalField(max_digits=12, decimal_places=4, default=0.0000)
    TinhTrang = models.BooleanField(default=False)

    class Meta:
        db_table = 'CHITIET_GIOHANG'
        unique_together = ('MaGioHang', 'MaMatHang')

# Table 15
class DanhGia(models.Model):
    MaKhachHang = models.ForeignKey('KhachHang', on_delete=models.CASCADE)
    MaMatHang = models.ForeignKey('MatHang', on_delete=models.CASCADE)

    class Meta:
        db_table = 'DANHGIA'
        unique_together = ('MaKhachHang', 'MaMatHang')

# Table 16
class PhuongThucGiaoDich(models.Model):
    MaPhuongThuc = models.SmallAutoField(primary_key=True)
    TenPhuongThuc = models.CharField(max_length=100, unique=True)

    class Meta:
        db_table = 'PHUONGTHUC_GIAODICH'

# Table 17
class KhachHangPhuongThuc(models.Model):
    MaKhachHang = models.ForeignKey('KhachHang', on_delete=models.CASCADE)
    MaPhuongThuc = models.ForeignKey('PhuongThucGiaoDich', on_delete=models.CASCADE)

    class Meta:
        db_table = 'KHACHHANG_PHUONGTHUC'
        unique_together = ('MaKhachHang', 'MaPhuongThuc')

# Table 18
class LichSuThanhToan(models.Model):
    MaGioHang = models.ForeignKey('GioHang', on_delete=models.CASCADE)
    MaKhachHang = models.ForeignKey('KhachHang', on_delete=models.CASCADE)
    MaPhuongThuc = models.ForeignKey('PhuongThucGiaoDich', on_delete=models.CASCADE)
    ThoiDiem = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'LICHSU_THANHTOAN'
        unique_together = ('MaGioHang', 'MaKhachHang', 'MaPhuongThuc', 'ThoiDiem')