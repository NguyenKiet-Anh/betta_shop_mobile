from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import *

# Register your models here.
admin.site.register(Quan)
admin.site.register(LoaiDaiLy)
admin.site.register(DaiLy)
admin.site.register(DaiLyDiaChi)
admin.site.register(LoaiMatHang)
admin.site.register(MatHang)
admin.site.register(TaiKhoan)
admin.site.register(KhachHang)
admin.site.register(TaiKhoanKhachHang)
admin.site.register(KhachHangDiaChi)
admin.site.register(PhieuXuatHang)
admin.site.register(ChiTietPhieuXuatHang)
admin.site.register(YeuThich)
admin.site.register(GioHang)
admin.site.register(ChiTietGioHang)
admin.site.register(DanhGia)
admin.site.register(PhuongThucGiaoDich)
# admin.site.register(KhachHangPhuongThuc)
admin.site.register(LichSuThanhToan)
