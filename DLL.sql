-- Create table QUAN
create table QUAN (
	MaQuan smallserial, -- Primary key, unique identifier for each record
	TenQuan character varying(100) not null, -- Name of district
	TenThanhPho	character varying(100) not null, -- Name of city
	constraint pk_quan primary key (MaQuan)
);

-- Create table LOAIDAILY
create table LOAIDAILY (
	MaLoaiDaiLy smallserial, -- Primary key, unique identifier for each record
	TenLoaiDaiLy character varying(100) unique not null, -- Name of category of store
	SoTienNoToiDa decimal(12,4) default 0, -- A Store's debt cannot bigger than this amount (in the same category), constraint 'SoTienNoToiDa >= 0' will be checked in frontend
	constraint pk_loaidaily primary key(MaLoaiDaiLy)
);

-- Create table DAILY
create table DAILY (
	MaDaiLy smallserial, -- Primary key, unique identifier for each record
	MaLoaiDaiLy smallint not null, -- Foreign key to MaLoaiDaiLy Table
	TenDaiLy character varying(100) unique not null , -- Name of the store -- check (TenDaiLy ~* '^[A-Za-z0-9]+(?:\s[A-Za-z0-9]+)*$') should do in frontend
	SoDienThoai character varying(20) unique not null, -- Store's phone number
	NgayTiepNhan date default current_date, -- The date the store was registerd, just date and not included time
	SoTienNo decimal(12, 4) default 0, -- A mount of deb for each store, constraint 'SoTienNo >= 0' will be checked in frontend
	HinhAnh character varying(200), -- used for store link of images
	constraint pk_daily primary key(MaDaiLy),
	constraint fk_daily_to_loaidaily foreign key(MaLoaiDaiLy) references LOAIDAILY(MaLoaiDaiLy) on delete set null
);

-- Crreate table LOAIMATHANG
create table LOAIMATHANG (
	MaLoaiMatHang smallserial, -- Unique Identifier for each record
	TenLoaiMatHang varchar(100) unique not null,
	constraint pk_loaimathang primary key(MaLoaiMatHang)
);

-- Create table MATHANG
create table MATHANG (
	MaMatHang smallserial, -- Primary key, unique identifier for each record
	TenMatHang character varying(100) unique not null, -- check (TenMatHang ~* '^[A-Za-z]+(?:\s[A-Za-z]+)*$') should do in frontend
	SoLuongTon int default 0, -- Amount left of product in store , constraint 'SoLuongTon >= 0' will be checked in frontend
	Dongia decimal(12, 4) not null,
	TenDVT character varying(50) not null, -- This field must be checked before being inserted
	HinhAnh character varying(100),
	MaDaiLy smallint not null,
	MaLoaiMatHang smallint not null,
	constraint pk_mathang primary key(MaMatHang),
	constraint fk_mathang_to_daily foreign key(MaDaiLy) references DAILY(MaDaiLy) on delete cascade,
	constraint fk_mathanG_to_loaimathang foreign key(MaLoaiMatHang) references LOAIMATHANG(MaLoaiMatHang) on delete cascade
);

-- Create table TAIKHOAN
create table TAIKHOAN (
	MaTaiKhoan smallserial,
	TenTaiKhoan character varying(100) unique not null,
	MatKhau character varying(200) not null,
	isActivated bool default FALSE,
	constraint pk_taikhoan primary key(MaTaiKhoan)
);

-- Create table KHACHHANG
create table KHACHHANG (
	MaKhachHang smallserial, -- Unique Identifier for each record
	TenKhachHang varchar(100) not null,
	SoDienThoai varchar(20) unique not null,
	constraint pk_khachhang primary key(MaKhachHang)
);

-- Create table TAIKHOAN_KHACHHANG
create table TAIKHOAN_KHACHHANG (
	MaKhachHang smallint not null,
	MaTaiKhoan smallint not null,
	constraint pk_taikhoan_khachhang primary key(MaKhachHang, MaTaiKHoan),
	constraint fk_taikhoan_khachhang_to_khachhang foreign key(MaKhachHang) references KHACHHANG(MaKhachHang) on delete cascade,
	constraint fk_taikhoan_khachhang_to_taikhoan foreign key(MaTaiKhoan) references TAIKHOAN(MaTaiKhoan) on delete cascade
);


-- Create table KHACHHANG_DIACHI
create table KHACHHANG_DIACHI (
	MaKhachHang smallint not null,
	MaQuan smallint not null,
	DiaChi varchar(200) not null,
	constraint pk_khachhang_diachi primary key(MaKhachHang, MaQuan),
	constraint fk_khachhang_diachi_to_khachhang foreign key(MaKhachHang) references KHACHHANG(MaKhachHang) on delete cascade,
	constraint fk_khachhang_diachi_to_quan foreign key(MaQuan) references QUAN(MaQuan)
);

-- Create table PHIEUXUATHANG
create table PHIEUXUATHANG (
	MaPhieuXuat smallserial, -- Primary key
	NgayLapPhieu date default current_date,
	TongTien decimal(12, 4) not null, -- constraint '(TongTien >= 0)' will be checked in frontend
	MaDaiLy smallint not null,
	MaKhachHang smallint not null,
	constraint pk_phieuxuathang primary key(MaPhieuXuat),
	constraint fk_phieuxuathang_to_daily foreign key(MaDaiLy) references DAILY(MaDaiLy) on delete cascade,
	constraint fk_phieuxuathang_to_khachhang foreign key(MaKhachHang) references KHACHHANG(MaKhachHang) on delete cascade
);

-- Create table CHITIET_PXH 
create table CHITIET_PXH (
	MaCT_PXH serial, -- Primary key
	MaPhieuXuat smallint not null,
	MaMatHang smallint not null,
	SoLuongXuat int default 0, -- constraint '(SoLuongXuat >= 0)' will be checked in frontend
	constraint pk_chitiet_pxh primary key(MaCT_PXH),
	constraint fk_chitiet_pxh_to_phieuxuathang foreign key(MaPhieuXuat) references PHIEUXUATHANG(MaPhieuXuat) on delete cascade,
	constraint fk_chitiet_pxh_to_mathang foreign key(MaMatHang) references MATHANG(MaMatHang) on delete set null
);

-- Create table YEUTHICH
create table YEUTHICH (
	MaKhachHang smallint not null,
	MaMatHang smallint not null,
	constraint pk_yeuthich primary key(MaKhachHang, MaMatHang),
	constraint fk_yeuthich_to_khachhang foreign key(MaKhachHang) references KHACHHANG(MaKhachHang) on delete cascade,
	constraint fk_yeuthich_to_mathang foreign key(MaMatHang) references MATHANG(MaMatHang) on delete cascade
);

-- Create table GIOHANG
create table GIOHANG (
	MaGiohang serial, -- Unique identifier for each row
	MaKhachHang smallint not null,
	TongTien decimal(12, 4) default 0.0000,
	constraint pk_giohang primary key(MaGioHang),
	constraint fk_giohang_to_khachhang foreign key(MaKhachHang) references KHACHHANG(MaKhachHang) on delete cascade
);

-- Create table CHITIET_GIOHANG
create table CHITIET_GIOHANG (
	MaGioHang int not null,
	MaMatHang smallint not null,
	SoLuong smallint default 0 check(SoLuong >= 0),
	ThanhTien decimal(12, 4) default 0.0000,
	TinhTrang boolean default false,
	constraint pk_chittiet_giohang primary key(MaGioHang, MaMatHang),
	constraint fk_chitiet_giohang_to_giohang foreign key(MaGioHang) references GIOHANG(MaGioHang) on delete cascade,
	constraint fk_chitiet_giohang_to_mathang foreign key(MaMatHang) references MATHANG(MaMatHang) on delete cascade
);

-- create table DANHGIA
create table DANHGIA (
	MaKhachHang smallint not null,
	MaMatHang smallint not null,
	constraint pk_danhgia primary key(MaKhachHang, MaMatHang),
	constraint fk_danhgia_khachhang foreign key(MaKhachHang) references KHACHHANG(MaKhachHang) on delete cascade,
	constraint fk_danhgia_mathang foreign key(MaMatHang) references MATHANG(MaMatHang) on delete cascade
);

-- create table PHUONGTHUC_GIAODICH
create table PHUONGTHUC_GIAODICH (
	MaPhuongThuc smallserial, --Primary key
	TenPhuongThuc varchar(100) unique not null,
	constraint pk_phuongthuc_giaodich primary key(MaPhuongThuc)
);

-- create table KHACHHANG_PHUONGTHUC
create table KHACHHANG_PHUONGTHUC (
	MaKhachHang smallint not null,
	MaPhuongThuc smallint not null,
	constraint pk_khachhang_phuongthuc primary key(MaKhachHang, MaPhuongThuc),
	constraint fk_khachhang_phuongthuc_khachhang foreign key(MaKhachHang) references KHACHHANG(MaKhachHang) on delete cascade,
	constraint fk_khachhang_phuongthuc_phuongthuc foreign key(MaPhuongThuc) references PHUONGTHUC_GIAODICH(MaPhuongThuc) on delete cascade
);

-- create table LICHSU_THANHTOAN
create table LICHSU_THANHTOAN (
	MaGioHang int not null,
	MaKhachHang smallint not null,
	MaPhuongThuc smallint not null,
	ThoiDiem timestamp not null default current_timestamp,
	constraint pk_lichsu_giaodich primary key(MaGioHang, MaKhachHang, MaPhuongThuc, ThoiDiem),
	constraint fk_lichsu_giaodich_giohang foreign key(MaGioHang) references GIOHANG(MaGioHang) on delete cascade,
	constraint fk_lichsu_giaodich_khachhang foreign key(MaKhachHang) references KHACHHANG(MaKhachHang) on delete cascade,
	constraint fk_lichsu_giaodich_phuongthuc_giaodich foreign key(MaPhuongThuc) references PHUONGTHUC_GIAODICH(MaPhuongThuc) on delete cascade
);

