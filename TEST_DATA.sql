SET datestyle to dmy;
---------------------------------------------------------------- Insert Into TAIKHOAN --------------------------------------------------------------- done - not same
INSERT INTO TAIKHOAN(isAdmin, isCustomer, TenTaiKhoan, MatKhau, isActivated) VALUES
(True, False, 'NVA', '027735', True),
(False, True, 'NVB', '027735', True),
(False, True, 'NVC', '027735', True),
(False, True, 'NVD', '027735', True),
(False, True, 'NVE', '027735', True),
(False, True, 'NVF', '027735', True);
SELECT * FROM TAIKHOAN;
TRUNCATE TAIKHOAN CASCADE;
ALTER SEQUENCE TAIKHOAN_mataikhoan_seq RESTART WITH 1;

------------------------------------------------------------------ Insert Into QUAN ----------------------------------------------------------------- done - same
INSERT INTO QUAN (TenQuan, TenThanhPho) VALUES
('Bình Tân', 'Hồ Chí Minh'),
('Tân Phú', 'Hồ Chí Minh'),
('6', 'Hồ Chí Minh'),
('Thủ Đức', 'Hồ Chí Minh'),
('Tân Phú Đông', 'Sa Đéc');
SELECT * FROM QUAN;
TRUNCATE QUAN CASCADE;
ALTER SEQUENCE QUAN_maquan_seq RESTART WITH 1;

---------------------------------------------------------------- Insert Into LOAIDAILY -------------------------------------------------------------- done - same
INSERT INTO LOAIDAILY(TenLoaiDaiLy, SoTienNoToiDa) VALUES
('Đại lý cấp 1', 50000000),
('Đại lý cấp 2', 65000000),
('Đại lý cấp 3', 80000000);
SELECT * FROM LOAIDAILY;
TRUNCATE LOAIDAILY CASCADE;
ALTER SEQUENCE LOAIDAILY_maloaidaily_seq RESTART WITH 1;

--------------------------------------------------------------- Insert Into LOAIMATHANG ------------------------------------------------------------- done - same
INSERT INTO LOAIMATHANG(TenLoaiMatHang) VALUES
('Halfmoon'),
('Samurai'),
('Crowntail'),
('Nemo');
SELECT * FROM LOAIMATHANG;
TRUNCATE LOAIMATHANG CASCADE;
ALTER SEQUENCE LOAIMATHANG_maloaimathang_seq RESTART WITH 1;

------------------------------------------------------------------ Insert Into DAILY ---------------------------------------------------------------- done - same
INSERT INTO DAILY (MaLoaiDaiLy, TenDaiLy, SoDienThoai, HinhAnh) VALUES
('1', 'Đại lý Bình Tân 1', '09876543212', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\stores\store-1.jpeg'),
('1', 'Đại lý Bình Tân 2', '09876543213', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\stores\store-2.jpeg'),
('2', 'Đại lý Tân Phú 1', '09876543214', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\stores\store-3.jpeg'),
('2', 'Đại lý Tân Phú 2', '09876543215', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\stores\store-4.jpeg'),
('3', 'Đại lý Bình Thạnh 1', '09876543216', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\stores\store-5.jpeg'),
('3', 'Đại lý Bình Thạnh 2', '09876543217', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\stores\store-6.jpeg'),
('1', 'Đại lý Thủ Đức 1', '09876543218', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\stores\store-7.jpeg'),
('3', 'Đại lý Thủ Đức 2', '09876543219', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\stores\store-8.jpeg'),
('2', 'Đại lý Tân Phú Đông', '09876543220', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\stores\store-9.jpeg');
SELECT * FROM DAILY;
TRUNCATE DAILY CASCADE;
ALTER SEQUENCE DAILY_madaily_seq RESTART WITH 1;

----------------------------------------------------------------- Insert Into MATHANG --------------------------------------------------------------- done - not same
INSERT INTO MATHANG(TenMatHang, SoLuongTon, DonGia, KhuyenMai, GiaKhuyenMai, TenDVT, MaDaiLy, MaLoaiMatHang, HinhAnh1, HinhAnh2, HinhAnh3, HinhAnh4) VALUES
('Cá betta 1713 – Crowntail đuôi tưa phong sương peacemaker anshar', 7, 150000, True, 110000, 'con', '1', '3', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1713-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1713-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1713-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1713-4.jpg'),

('Cá betta 1763 – Crowntail đuôi tưa huyết kiếm wayfinder dionysus', 8, 150000, True, 110000, 'con', '2', '3', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1763-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1763-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1763-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1763-4.jpg'),

('Cá betta 1777 – Crowntail đuôi tưa tứ hải stormbringer enlil', 9, 150000, True, 110000, 'con', '3', '3', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1777-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1777-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1777-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1777-4.jpg'),

('Cá betta 1789 – Crowntail đuôi tưa warbringer sobek', 10, 150000, False, 0, 'con', '4', '3', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1789-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1789-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1789-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1789-4.jpg'),
  
('Cá betta 1799 – Crowntail đuôi tưa stormguard tezcatlipoca', 3, 170000, False, 0, 'con', '5', '3', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1799-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1799-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1799-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1799-4.jpg'),

('Cá betta 1817 – Crowntail đuôi tưa stoneheart shiva', 11, 110000, False, 0, 'con', '6', '3', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1817-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1817-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1817-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1817-4.jpg'),

('Cá betta 1865 – Crowntail đuôi tưa bloodseeker janus', 15, 130000, False, 0, 'con', '7', '3', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1865-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1865-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1865-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1865-4.jpg'),

('Cá betta 1867 – Crowntail đuôi tưa runewarden cerunnos', 17, 150000, True, 130000, 'con', '8', '3', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1867-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1867-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1867-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1867-4.jpg'),

('Cá betta 1881 – Crowntail đuôi tưa heartbreaker balder', 12, 160000, False, 0, 'con', '9', '3', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1881-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1881-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1881-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1881-4.jpg'),

('Cá betta 1882 – Crowntail đuôi tưa ironforge mercury', 20, 100000, True, 80000, 'con', '1', '3', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1882-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1882-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1882-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1882-4.jpg'),

('Cá betta 1883 – Crowntail đuôi tưa skullbreaker ares', 6, 150000, True, 110000, 'con', '2', '3', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1883-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1883-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1883-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-1883-4.jpg'),

('Cá betta 2067 – Crowntail đuôi tưa vanguard warrior', 9, 140000, False, 0, 'con', '3', '3', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-2067-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-2067-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-2067-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\crowntail\betta-2067-4.jpg'),



('Cá betta 1299 – Red fancy copper lotus Aker form đẹp', 14, 150000, False, 0, 'con', '4', '1', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-1299-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-1299-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-1299-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-1299-4.jpg'),

('Cá betta 1469 – Halfmoon dumbo lavender màu tím đẹp', 3, 140000, True, 110000, 'con', '5', '1', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-1469-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-1469-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-1469-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-1469-4.jpg'),

('Cá betta 2064 – Halfmoon blue red lifeguard', 9, 80000, False, 0, 'con', '6', '1', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2064-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2064-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2064-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2064-4.jpg'),

('Cá betta 2097 – Halfmoon màu đồng hiếm stormbringer', 18, 40000, False, 0, 'con', '7', '1', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2097-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2097-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2097-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2097-4.jpg'),

('Cá betta 2100 – Halfmoon mustard gas stonefist', 5, 80000, True, 50000, 'con', '8', '1', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2100-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2100-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2100-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2100-4.jpg'),

('Cá betta 2134 – Halfmoon yellow koi the unbroken', 7, 80000, False, 0, 'con', '9', '1', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2134-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2134-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2134-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2134-4.jpg'),

('Cá betta 2174 – Halfmoon koi blue white voidwalker', 11, 100000, True, 80000, 'con', '1', '1', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2174-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2174-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2174-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2174-4.jpg'),

('Cá betta 2202 – Halfmoon blue red ironforge', 18, 120000, True, 90000, 'con', '2', '1', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2202-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2202-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2202-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2202-4.jpg'),

('Cá betta 2230 – Halfmoon blue red chaosforged', 4, 90000, True, 40000, 'con', '3', '1', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2230-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2230-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2230-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2230-4.jpg'),

('Cá betta 2464 – Halfmoon blue dragonheart', 7, 80000, False, 0, 'con', '4', '1', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2464-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2464-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2464-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2464-4.jpg'),

('Cá betta 2465 – Halfmoon blue steelshadow', 10, 50000, True, 10000, 'con', '5', '1', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2465-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2465-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2465-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2465-4.jpg'),

('Cá betta 2472 – Mái halfmoon blue red worldbreaker', 14, 80000, False, 0, 'con', '6', '1', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2472-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2472-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2472-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2472-4.jpg'),

('Cá betta 2478 – Mái halfmoon mustard gas doomseeker', 19, 40000, False, 0, 'con', '7', '1', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2478-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2478-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2478-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2478-4.jpg'),

('Cá betta 2479 – Mái halfmoon super red sunkeeper', 16, 40000, False, 0, 'con', '8', '1', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2479-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2479-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2479-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2479-4.jpg'),

('Cá betta 2485 – Mái halfmoon blue oathbearer', 5, 60000, True, 40000, 'con', '9', '1', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2485-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2485-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2485-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2485-4.jpg'),

('Cá betta 2501 – Halfmoon blue gas dreadnought', 9, 10000, False, 0, 'con', '1', '1', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2501-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2501-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2501-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\halfmoon\betta-2501-4.jpg'),



('Cá betta 1123 – Koi nemo candy viên kẹo ngọt ngào Hypnos', 11, 240000, True, 180000, 'con', '2', '4', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-1123-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-1123-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-1123-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-1123-4.jpg'),

('Cá betta 2018 – Koi nemo tiger titan', 14, 140000, False, 0, 'con', '3', '4', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2018-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2018-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2018-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2018-4.jpg'),

('Cá betta 1648 – Koi nemo tiger body sumo itzamna', 18, 140000, True, 60000, 'con', '4', '4', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-1648-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-1648-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-1648-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-1648-4.jpg'),

('Cá betta 2214 – Mái koi nemo lightstriker', 7, 110000, False, 0, 'con', '5', '4', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2214-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2214-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2214-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2214-4.jpg'),

('Cá betta 2248 – Mái koi nemo candy chaosbringer', 14, 140000, True, 110000, 'con', '6', '4', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2248-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2248-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2248-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2248-4.jpg'),

('Cá betta 1711 – Koi nemo candy vũ tướng conqueror janus', 8, 180000, True, 140000, 'con', '7', '4', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-1711-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-1711-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-1711-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-1711-4.jpg'),

('Cá betta 1673 – Mái koi nemo xích hổ stalwart horus', 11, 110000, False, 0, 'con', '8', '4', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-1673-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-1673-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-1673-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-1673-4.jpg'),

('Cá betta 2292 – Mái koi nemo savior', 7, 110000, False, 0, 'con', '9', '4', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2292-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2292-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2292-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2292-4.jpg'),

('Cá betta 2116 – Koi nemo tiger candy dawnbringer', 17, 140000, False, 0, 'con', '1', '4', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2116-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2116-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2116-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2116-4.jpg'),

('Cá betta 2301 – Mái koi nemo soldier', 7, 150000, True, 110000, 'con', '2', '4', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2301-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2301-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2301-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2301-4.jpg'),

('Cá betta 2377 – Koi nemo candy nền vàng cam truthseeker', 15, 150000, True, 140000, 'con', '3', '4', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2377-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2377-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2377-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2377-4.jpg'),

('Cá betta 1943 – Koi nemo titger chaosbreaker amaterasu', 14, 140000, True, 110000, 'con', '4', '4', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-1943-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-1943-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-1943-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-1943-4.jpg'),

('Cá betta 1481 – Mái koi nemo candy galaxy pluto', 18, 110000, False, 0, 'con', '5', '4', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-1481-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-1481-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-1481-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-1481-4.jpg'),

('Cá betta 2225 – Mái koi nemo candy steelbearer', 15, 80000, False, 0, 'con', '6', '4', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2225-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2225-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2225-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2225-4.jpg'),

('Cá betta 2184 – Mái koi nemo tiger bonecrusher', 5, 150000, False, 0, 'con', '7', '4', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2184-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2184-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2184-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2184-4.jpg'),

('Cá betta 2295 – Koi nemo candy knight', 6, 140000, False, 0, 'con', '8', '4', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2295-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2295-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2295-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\nemo\betta-2295-4.jpg'),



('Cá betta 646 – Samurai xanh super star siêu sayda', 16, 180000, True, 150000, 'con', '9', '2', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-646-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-646-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-646-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-646-4.jpg'),

('Cá betta 1324 – Halfmoon samurai super star', 8, 180000, True, 80000, 'con', '1', '2', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-1324-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-1324-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-1324-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-1324-4.jpg'),

('Cá betta 1325 – Halfmoon samurai butterfly illusion', 13, 180000, False, 0, 'con', '2', '2', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-1325-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-1325-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-1325-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-1325-4.jpg'),

('Cá betta 1531 – Samurai super star chiến binh Minamoto no Yoritomo', 15, 150000, False, 0, 'con', '3', '2', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-1531-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-1531-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-1531-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-1531-4.jpg'),

('Cá betta 1876 – Samurai super star stormbreaker indra', 4, 180000, True, 150000, 'con', '4', '2', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-1876-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-1876-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-1876-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-1876-4.jpg'),

('Cá betta 2311 – Mái samurai star legend', 15, 110000, False, 0, 'con', '5', '2', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-2311-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-2311-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-2311-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-2311-4.jpg'),

('Cá betta 2399 – Rồng đen samurai kingmaker', 23, 150000, True, 60000, 'con', '6', '2', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-2399-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-2399-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-2399-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-2399-4.jpg'),

('Cá betta 2420 – Samurai lửa stonefist', 20, 180000, False, 0, 'con', '7', '2', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-2420-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-2420-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-2420-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-2420-4.jpg'),

('Cá betta 2458 – Samurai fortuneseeker', 20, 150000, False, 0, 'con', '8', '2', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-2458-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-2458-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-2458-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-2458-4.jpg'),

('Cá betta 2475 – Samurai lửa swordbringer', 25, 10000, False, 0, 'con', '9', '2', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-2475-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-2475-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-2475-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-2475-4.jpg'),

('Cá betta 2481 – Samurai super star flameguard', 13, 150000, True, 120000, 'con', '1', '2', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-2481-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-2481-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-2481-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-2481-4.jpg'),

('Cá betta 2486 – Mái samurai star the unyielding', 16, 110000, False, 0, 'con', '2', '2', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-2486-1.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-2486-2.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-2486-3.jpg', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\fishes\samurai\betta-2486-4.jpg');
SELECT * FROM MATHANG;
TRUNCATE MATHANG CASCADE;
ALTER SEQUENCE MATHANG_mamathang_seq RESTART WITH 1;

---------------------------------------------------------------- Insert Into KHACHHANG -------------------------------------------------------------- done - not same
INSERT INTO KHACHHANG(TenKhachHang, SoDienThoai, Email, HinhAnh) VALUES
('Nguyễn Văn A', '0918676585', 'nva@gmail.com', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\users\staff-1.jpeg'),
('Nguyễn Văn B', '0918676586', 'nvb@gmail.com', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\users\staff-2.jpeg'),
('Nguyễn Văn C', '0918676587', 'nvc@gmail.com', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\users\staff-3.jpeg'),
('Nguyễn Văn D', '0918676588', 'nvd@gmail.com', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\users\staff-4.jpeg'),
('Nguyễn Văn E', '0918676589', 'nve@gmail.com', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\users\staff-5.jpeg'),
('Nguyễn Văn F', '0918676590', 'nvb@gmail.com', 'D:\Studying\UIT Online Class\IE307.P11 - Cong Nghe Lap Trinh Da Nen Tang Cho Ung Dung Di Dong\Bao Cao\GitHub\database\images\users\staff-6.jpeg');
SELECT * FROM KHACHHANG;
TRUNCATE KHACHHANG CASCADE;
ALTER SEQUENCE KHACHHANG_makhachhang_seq RESTART WITH 1;

----------------------------------------------------------- Insert Into TAIKHOAN_KHACHHANG ---------------------------------------------------------- done - new
INSERT INTO TAIKHOAN_KHACHHANG(MaKhachHang, MaTaiKhoan) VALUES
('1', '1'),
('2', '2'),
('3', '3'),
('4', '4'),
('5', '5'),
('6', '6');
SELECT * FROM TAIKHOAN_KHACHHANG
TRUNCATE TAIKHOAN_KHACHHANG CASCADE

------------------------------------------------------------- Insert Into DAILY_DIACHI ----------------------------------------------------------- done - same
INSERT INTO DAILY_DIACHI(MaDaiLy, MaQuan, DiaChi, KinhDo, ViDo) VALUES
('1', '1', '815/4/7/18 HL2, Bình Trị Đông A, Bình Tân, Hồ Chí Minh', '106.60085349065719', '10.763397007114165'),
('2', '2', '235 Lê Trọng Tấn, Sơn Kỳ, Tân Phú, Hồ Chí Minh', '106.62323023409282', '10.807080488575966'),
('3', '3', 'I11 Cư Xá Phú Lâm B, Phường 13, Quận 6, Hồ Chí Minh', '106.6287267311272', '10.754254858524995'),
('4', '4', 'Hàn Thuyên, Phường Linh Trung, Thủ Đức, Hồ Chí Minh', '106.80174407277953', '10.870381323834005'),
('5', '1', '496 Lê Văn Quới, Bình Trị Đông A, Bình Tân, Hồ Chí Minh', '106.60576563535994', '10.776501771982767'),
('6', '2', '216 Thoại Ngọc Hầu, Phú Thạnh, Tân Phú, Hồ Chí Minh', '106.6306088696668', '10.778830216248187'),
('7', '3', '386 Nguyễn Văn Luông, Phường 12, Quận 6, Hồ Chí Minh', '106.63532009975903', '10.751170907265717'),
('8', '4', 'Mạc Đĩnh Chi, Đông Hoà, Dĩ An, Hồ Chí Minh', '106.78195810759765', '10.881535285631417'),
('9', '1', '689 Tân Kỳ, Tân Quý, Bình Tân, Hồ Chí Minh', '106.60762939181262', '10.79299408343064');
SELECT * FROM DAILY_DIACHI
TRUNCATE NHANVIEN_DIACHI CASCADE

------------------------------------------------------------- Insert Into KHACHHANG_DIACHI ---------------------------------------------------------- done - not same
INSERT INTO KHACHHANG_DIACHI(MaKhachHang, MaQuan, DiaChi) VALUES
('1', '1', '23 Văn Cao, Phú Thạnh, Tân Phú, Hồ Chí Minh'),
('2', '2', '820 Hương Lộ 2, Bình Trị Đông A, Bình Tân, Hồ Chí Minh'),
('3', '3', '33 Văn Cao, Phú Thạnh, Tân Bình, Hồ Chí Minh'),
('4', '4', '25 Văn Cao, Phú Thạnh, Phú Nhuận, Hồ Chí Minh'),
('5', '1', '26 Văn Cao, Phú Thạnh, Bình Tân, Hồ Chí Minh'),
('6', '2', '27 Văn Cao, Phú Thạnh, Thủ Đức, Hồ Chí Minh');
SELECT * FROM KHACHHANG_DIACHI
TRUNCATE KHACHHANG_DIACHI CASCADE

-------------------------------------------------------------- Insert Into PHIEUXUATHANG ------------------------------------------------------------ done - same
INSERT INTO PHIEUXUATHANG(MaDaiLy, MaKhachHang, TongTien) VALUES
('1', '1', 3640000),
('2', '2', 6340000),
('3', '3', 3460000),
('4', '4', 6430000),
('5', '5', 4360000),
('6', '6', 4630000);
SELECT * FROM PHIEUXUATHANG;
TRUNCATE PHIEUXUATHANG CASCADE;
ALTER SEQUENCE PHIEUXUATHANG_maphieuxuat_seq RESTART WITH 1;

--------------------------------------------------------------- Insert Into CHITIET_PXH ------------------------------------------------------------- done - same
INSERT INTO CHITIET_PXH(MaPhieuXuat, MaMatHang, SoLuongXuat) VALUES
('1', '1', 5),
('1', '4', 4),
('1', '7', 10),
('1', '12', 3),

('2', '8', 4),
('2', '36', 5),
('2', '19', 1),
('2', '29', 6),

('3', '9', 8),
('3', '40', 4),
('3', '3', 3),
('3', '5', 1),

('4', '44', 2),
('4', '17', 1),
('4', '20', 4),
('4', '15', 3),

('5', '48', 10),
('5', '52', 8),
('5', '32', 4),
('5', '13', 12),

('6', '10', 13),
('6', '16', 8),
('6', '22', 1),
('6', '24', 4);
SELECT * FROM CHITIET_PXH;
TRUNCATE CHITIET_PXH CASCADE;
ALTER SEQUENCE CHITIET_PXH_mact_pxh_seq RESTART WITH 1;

---------------------------------------------------------------- Insert Into YEUTHICH ---------------------------------------------------------------- done - new
INSERT INTO YEUTHICH(MaKhachHang, MaMatHang) VALUES
('1', '1'),
('2', '2'),
('3', '3'),
('4', '4'),
('5', '5'),
('6', '6'),

('1', '13'),
('2', '14'),
('3', '15'),
('4', '16'),
('5', '17'),
('6', '18'),

('1', '29'),
('2', '30'),
('3', '31'),
('4', '32'),
('5', '33'),
('6', '34'),

('1', '45'),
('2', '46'),
('3', '47'),
('4', '48'),
('5', '49'),
('6', '50');
SELECT * FROM YEUTHICH
TRUNCATE YEUTHICH CASCADE

---------------------------------------------------------------- Insert Into GIOHANG ---------------------------------------------------------------- done - new
INSERT INTO GIOHANG(MaKhachHang, TongTien) VALUES
('1', 0),
('2', 0),
('3', 0),
('4', 0),
('5', 0),
('6', 0);
SELECT * FROM GIOHANG
TRUNCATE GIOHANG CASCADE
ALTER SEQUENCE GIOHANG_magiohang_seq RESTART WITH 1;

------------------------------------------------------------ Insert Into CHITIET_GIONHANG ----------------------------------------------------------- not done - new
INSERT INTO CHITIET_GIONHANG(MaGioHang, MaMatHang, SoLuong, ThanhTien, TinhTrang) VALUES
('1', ),
('2', ),
('3', ),
('4', ),
('5', ),
('6', );
SELECT * FROM CHITIET_GIONHANG
TRUNCATE CHITIET_GIONHANG CASCADE

----------------------------------------------------------------- Insert Into DANHGIA --------------------------------------------------------------- done - new
INSERT INTO DANHGIA(MaKhachHang, MaMatHang, BinhLuan, Sao) VALUES
('1', '1', 'Cá đẹp', 50),
('2', '2', 'Giá có hơi đắt', 45),
('3', '3', 'Cá này có giảm giá không shop', 40),
('4', '4', 'Cá hơi nhỏ, khá tốn công nuôi', 30),
('5', '5', 'Cá đẹp, nuôi dễ, giá cả cũng phải chăng', 45),
('6', '6', 'Cá này không hợp phong thủy trang trí cho lắm', 25),

('1', '13', 'Cá này không hợp phong thủy trang trí cho lắm', 25),
('2', '14', 'Cá đẹp', 50),
('3', '15', 'Giá có hơi đắt', 45),
('4', '16', 'Cá này có giảm giá không shop', 40),
('5', '17', 'Cá hơi nhỏ, khá tốn công nuôi', 20),
('6', '18', 'Cá đẹp, nuôi dễ, giá cả cũng phải chăng', 50),

('1', '29', 'Cá đẹp, nuôi dễ, giá cả cũng phải chăng', 40),
('2', '30', 'Cá này không hợp phong thủy trang trí cho lắm', 10),
('3', '31', 'Cá đẹp', 45),
('4', '32', 'Giá có hơi đắt', 30),
('5', '33', 'Cá này có giảm giá không shop', 40),
('6', '34', 'Cá hơi nhỏ, khá tốn công nuôi', 15),

('1', '45', 'Cá hơi nhỏ, khá tốn công nuôi', 20),
('2', '46', 'Cá đẹp, nuôi dễ, giá cả cũng phải chăng', 40),
('3', '47', 'Cá này không hợp phong thủy trang trí cho lắm', 30),
('4', '48', 'Cá đẹp', 50),
('5', '49', 'Giá có hơi đắt', 45),
('6', '50', 'Cá này có giảm giá không shop', 35);
SELECT * FROM DANHGIA
TRUNCATE DANHGIA CASCADE

----------------------------------------------------------- Insert Into PHUONGTHUC_GIAODICH --------------------------------------------------------- done - new
INSERT INTO PHUONGTHUC_GIAODICH(TenPhuongThuc) VALUES
('Chuyển khoản'),
('Tiền mặt'),
('Ghi nợ');
SELECT * FROM PHUONGTHUC_GIAODICH
TRUNCATE PHUONGTHUC_GIAODICH CASCADE
ALTER SEQUENCE PHUONGTHUC_GIAODICH_maphuongthuc_seq RESTART WITH 1;


---------------------------------------------------------- Insert Into KHACHHANG_PHUONGTHUC --------------------------------------------------------- done - new
INSERT INTO KHACHHANG_PHUONGTHUC(MaKhachHang, MaPhuongThuc) VALUES
('1', '1'),
('2', '2'),
('3', '3'),
('4', '3'),
('5', '2'),
('6', '1');
SELECT * FROM KHACHHANG_PHUONGTHUC
TRUNCATE KHACHHANG_PHUONGTHUC CASCADE

---------------------------------------------------------- Insert Into LICHSU_THANHTOAN --------------------------------------------------------- done - new
INSERT INTO LICHSU_THANHTOAN(MaGioHang, MaKhachHang, MaPhuongThuc) VALUES
('1', '1', '1'),
('2', '2', '2'),
('3', '3', '3'),
('4', '4', '3'),
('5', '5', '2'),
('6', '6', '1');
SELECT * FROM LICHSU_THANHTOAN
TRUNCATE LICHSU_THANHTOAN CASCADE