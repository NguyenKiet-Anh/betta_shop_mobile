# Generated by Django 4.2.16 on 2024-12-20 10:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DaiLy',
            fields=[
                ('MaDaiLy', models.SmallAutoField(primary_key=True, serialize=False)),
                ('TenDaiLy', models.CharField(max_length=100, unique=True)),
                ('SoDienThoai', models.CharField(max_length=20, unique=True)),
                ('NgayTiepNhan', models.DateField(auto_now_add=True)),
                ('SoTienNo', models.DecimalField(decimal_places=4, default=0, max_digits=12)),
                ('HinhAnh', models.CharField(blank=True, max_length=200, null=True)),
            ],
            options={
                'db_table': 'DAILY',
            },
        ),
        migrations.CreateModel(
            name='KhachHang',
            fields=[
                ('MaKhachHang', models.SmallAutoField(primary_key=True, serialize=False)),
                ('TenKhachHang', models.CharField(max_length=100)),
                ('SoDienThoai', models.CharField(max_length=20, unique=True)),
                ('Email', models.CharField(blank=True, max_length=200, null=True)),
                ('HinhAnh', models.CharField(blank=True, max_length=200, null=True)),
            ],
            options={
                'db_table': 'KHACHHANG',
            },
        ),
        migrations.CreateModel(
            name='LoaiDaiLy',
            fields=[
                ('MaLoaiDaiLy', models.SmallAutoField(primary_key=True, serialize=False)),
                ('TenLoaiDaiLy', models.CharField(max_length=100, unique=True)),
                ('SoTienNoToiDa', models.DecimalField(decimal_places=4, default=0, max_digits=12)),
            ],
            options={
                'db_table': 'LOAIDAILY',
            },
        ),
        migrations.CreateModel(
            name='LoaiMatHang',
            fields=[
                ('MaLoaiMatHang', models.SmallAutoField(primary_key=True, serialize=False)),
                ('TenLoaiMatHang', models.CharField(max_length=100, unique=True)),
            ],
            options={
                'db_table': 'LOAIMATHANG',
            },
        ),
        migrations.CreateModel(
            name='MatHang',
            fields=[
                ('MaMatHang', models.SmallAutoField(primary_key=True, serialize=False)),
                ('TenMatHang', models.CharField(max_length=100, unique=True)),
                ('SoLuongTon', models.IntegerField(default=0)),
                ('Dongia', models.DecimalField(decimal_places=4, max_digits=12)),
                ('KhuyenMai', models.BooleanField(default=False)),
                ('GiaKhuyenMai', models.DecimalField(decimal_places=4, default=0, max_digits=12)),
                ('TenDVT', models.CharField(max_length=50)),
                ('Gioitinh', models.CharField(choices=[('M', 'đực'), ('F', 'cái')], default='M', max_length=1)),
                ('HinhAnh1', models.CharField(blank=True, max_length=200, null=True)),
                ('HinhAnh2', models.CharField(blank=True, max_length=200, null=True)),
                ('HinhAnh3', models.CharField(blank=True, max_length=200, null=True)),
                ('HinhAnh4', models.CharField(blank=True, max_length=200, null=True)),
                ('MaDaiLy', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.daily')),
                ('MaLoaiMatHang', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.loaimathang')),
            ],
            options={
                'db_table': 'MATHANG',
            },
        ),
        migrations.CreateModel(
            name='PhuongThucGiaoDich',
            fields=[
                ('MaPhuongThuc', models.SmallAutoField(primary_key=True, serialize=False)),
                ('TenPhuongThuc', models.CharField(max_length=100, unique=True)),
            ],
            options={
                'db_table': 'PHUONGTHUC_GIAODICH',
            },
        ),
        migrations.CreateModel(
            name='Quan',
            fields=[
                ('MaQuan', models.SmallAutoField(primary_key=True, serialize=False)),
                ('TenQuan', models.CharField(max_length=100)),
                ('TenThanhPho', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'QUAN',
            },
        ),
        migrations.CreateModel(
            name='TaiKhoan',
            fields=[
                ('MaTaiKhoan', models.SmallAutoField(primary_key=True, serialize=False)),
                ('isAdmin', models.BooleanField(default=False)),
                ('isCustomer', models.BooleanField(default=True)),
                ('TenTaiKhoan', models.CharField(max_length=100, unique=True)),
                ('MatKhau', models.CharField(max_length=200)),
                ('isActivated', models.BooleanField(default=False)),
                ('verification_token', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'db_table': 'TAIKHOAN',
            },
        ),
        migrations.CreateModel(
            name='PhieuXuatHang',
            fields=[
                ('MaPhieuXuat', models.SmallAutoField(primary_key=True, serialize=False)),
                ('NgayLapPhieu', models.DateField(auto_now_add=True)),
                ('TongTien', models.DecimalField(decimal_places=4, max_digits=12)),
                ('MaDaiLy', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.daily')),
                ('MaKhachHang', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.khachhang')),
            ],
            options={
                'db_table': 'PHIEUXUATHANG',
            },
        ),
        migrations.CreateModel(
            name='GioHang',
            fields=[
                ('MaGioHang', models.AutoField(primary_key=True, serialize=False)),
                ('TongTien', models.DecimalField(decimal_places=4, default=0.0, max_digits=12)),
                ('MaKhachHang', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.khachhang')),
            ],
            options={
                'db_table': 'GIOHANG',
            },
        ),
        migrations.AddField(
            model_name='daily',
            name='MaLoaiDaiLy',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='backend.loaidaily'),
        ),
        migrations.CreateModel(
            name='ChiTietPhieuXuatHang',
            fields=[
                ('MaCT_PXH', models.AutoField(primary_key=True, serialize=False)),
                ('SoLuongXuat', models.IntegerField(default=0)),
                ('MaMatHang', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='backend.mathang')),
                ('MaPhieuXuat', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.phieuxuathang')),
            ],
            options={
                'db_table': 'CHITIET_PXH',
            },
        ),
        migrations.CreateModel(
            name='YeuThich',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('MaKhachHang', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.khachhang')),
                ('MaMatHang', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.mathang')),
            ],
            options={
                'db_table': 'YEUTHICH',
                'unique_together': {('MaKhachHang', 'MaMatHang')},
            },
        ),
        migrations.CreateModel(
            name='TaiKhoanKhachHang',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('MaKhachHang', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.khachhang')),
                ('MaTaiKhoan', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.taikhoan')),
            ],
            options={
                'db_table': 'TAIKHOAN_KHACHHANG',
                'unique_together': {('MaKhachHang', 'MaTaiKhoan')},
            },
        ),
        migrations.CreateModel(
            name='LichSuThanhToan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ThoiDiem', models.DateTimeField(auto_now_add=True)),
                ('MaGioHang', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.giohang')),
                ('MaKhachHang', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.khachhang')),
                ('MaPhuongThuc', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.phuongthucgiaodich')),
            ],
            options={
                'db_table': 'LICHSU_THANHTOAN',
                'unique_together': {('MaGioHang', 'MaKhachHang', 'MaPhuongThuc', 'ThoiDiem')},
            },
        ),
        migrations.CreateModel(
            name='KhachHangDiaChi',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('DiaChi', models.CharField(max_length=200)),
                ('KinhDo', models.CharField(max_length=15)),
                ('ViDo', models.CharField(max_length=15)),
                ('MaKhachHang', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.khachhang')),
                ('MaQuan', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.quan')),
            ],
            options={
                'db_table': 'KHACHHANG_DIACHI',
                'unique_together': {('MaKhachHang', 'MaQuan')},
            },
        ),
        migrations.CreateModel(
            name='DanhGia',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ThoiDiem', models.DateTimeField(auto_now_add=True)),
                ('BinhLuan', models.CharField(blank=True, max_length=500, null=True)),
                ('Sao', models.DecimalField(decimal_places=0, default=0, max_digits=2)),
                ('MaKhachHang', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.khachhang')),
                ('MaMatHang', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.mathang')),
            ],
            options={
                'db_table': 'DANHGIA',
                'unique_together': {('MaKhachHang', 'MaMatHang', 'ThoiDiem')},
            },
        ),
        migrations.CreateModel(
            name='DaiLyDiaChi',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('DiaChi', models.CharField(max_length=200)),
                ('KinhDo', models.CharField(max_length=15)),
                ('ViDo', models.CharField(max_length=15)),
                ('MaDaiLy', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.daily')),
                ('MaQuan', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.quan')),
            ],
            options={
                'db_table': 'DAILY_DIACHI',
                'unique_together': {('MaDaiLy', 'MaQuan')},
            },
        ),
        migrations.CreateModel(
            name='ChiTietGioHang',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('SoLuong', models.IntegerField(default=0)),
                ('ThanhTien', models.DecimalField(decimal_places=4, default=0.0, max_digits=12)),
                ('TinhTrang', models.BooleanField(default=False)),
                ('MaGioHang', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.giohang')),
                ('MaMatHang', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.mathang')),
            ],
            options={
                'db_table': 'CHITIET_GIOHANG',
                'unique_together': {('MaGioHang', 'MaMatHang')},
            },
        ),
    ]
