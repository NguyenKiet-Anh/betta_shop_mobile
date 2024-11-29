## betta_shop_mobile
# Frontend
<h2>- Câu lệnh: npm install</h2>
# Backend
<h2>- Một số libs cần cài thêm (Từ ngày 29/11/2024):</h2>
  <p><i>pip3 install adrf</i></p>
  <p><i>pip install uvicorn</i></p>
  <p><i>pip install channels</i></p>
<h2>- Cách khởi động để dùng được websocket:</h2>
  <p>Thay vì dùng <i>python3 manage.py runserver</i> thì dùng <i>uvicorn fish_shop.asgi:application --host <your_ip_address> --port 8000</i> và lưu ý phải cd được vào folder có chứa manage.py</p>
<h2>- Ngoài các thư viện trên để dùng được tích hợp thanh toán MOMO cần phải public được <ip_address>:<port> ra để nhận phản hồi từ MOMO về sau khi giao dịch thành công, thực hiện:</h2>
  <p>+ Cài đặt ngrok: tham khảo google</p>
  <p>+ Cài xong lên trang chủ tạo tài khoản và lấy token sử dụng</p>
  <p>+ Cập nhật token vào ngrok local với câu lệnh: <i>ngrok authtoken <your_token></i> </p>
  <p>+ Cuối cùng chạy lệnh: ngrok http <ip_address>:<port></p>
  <p>+ Ngrok public thành công ip:port thì lấy link của ngrok (hiện trên console) cập nhật vào settings - thêm vào ALLOW_HOST cũng như thay thế inputUrl trong api createPaymentLink<p>
