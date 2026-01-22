figma link: [https://www.figma.com/make/DtF6VLQZ8lHe3ZAboLXyGL/Learning-and-Work-Location-App?t=YPWEnHmjvf7qgmdh-0](https://www.figma.com/proto/cV6jPybqeJmfCMJqRDxEoW/Untitled?node-id=6-9&t=OYumx3S6NEd0t0t1-1)
erd link : https://app.diagrams.net/#G13cVS_eIVOxqQNWy0WSJ7D1C2VvnXoALt#%7B%22pageId%22%3A%22rS6axpN7arcFVDhaU1Ll%22%7D

1. USE CASE
1.1. Tác nhân (Actors)

Khách (Guest): Người chưa đăng nhập

Người dùng (User): Người đã đăng nhập bằng Google
Người dùng là chủ địa điểm (thư viện, quán cafe, ...)
Quản trị viên (Admin): Người quản lý và kiểm duyệt nội dung

1.2. Use Case của Khách

Xem danh sách địa điểm

Xem bài đánh giá

Xem bình luận

1.3. Use Case của Người dùng

Đăng nhập bằng Google

Viết bài đánh giá cho địa điểm

Sửa / Xóa bài đánh giá của mình

Bình luận bài đánh giá

Trả lời bình luận (comment lồng nhau)

Báo cáo bài đánh giá hoặc bình luận

Xem thông tin cá nhân

1.5. Use Case của Quản trị viên
Xem danh sách báo cáo

Xử lý báo cáo
Duyệt địa điểm

Ẩn / Xóa bài đánh giá hoặc bình luận vi phạm

1.6. Use Case của Người dùng là Chủ địa điểm

Người dùng là Chủ địa điểm (ví dụ: thư viện, quán cà phê, không gian học tập) là người dùng đã đăng nhập bằng Google và được cấp quyền quản lý địa điểm do mình sở hữu.

Ngoài các chức năng của Người dùng, Chủ địa điểm có thêm các ca sử dụng sau:

Đăng ký địa điểm mới

Cập nhật thông tin địa điểm (tên, mô tả, địa chỉ, giờ mở cửa, hình ảnh)

Xem trạng thái duyệt địa điểm (Chờ duyệt / Đã duyệt / Bị từ chối)

Xem danh sách bài đánh giá của địa điểm mình quản lý

Phản hồi (trả lời) bài đánh giá của người dùng

Quan hệ:

Chủ địa điểm kế thừa Người dùng

Use Case Đăng ký địa điểm bao gồm Nhập thông tin địa điểm

2. USER STORY
2.1. Đăng nhập

Là một người dùng, tôi muốn đăng nhập bằng Google để không cần tạo và ghi nhớ mật khẩu mới.

2.2. Đánh giá

Là một người dùng, tôi muốn viết bài đánh giá cho một địa điểm để chia sẻ trải nghiệm của mình.

Là một người dùng, tôi muốn chấm điểm từ 1 đến 5 sao để người khác dễ dàng đánh giá chất lượng địa điểm.

2.3. Bình luận

Là một người dùng, tôi muốn bình luận vào bài đánh giá để bày tỏ ý kiến cá nhân.

Là một người dùng, tôi muốn trả lời bình luận để tham gia thảo luận với những người dùng khác.

2.4. Báo cáo

Là một người dùng, tôi muốn báo cáo bài đánh giá hoặc bình luận không phù hợp để giúp hệ thống duy trì môi trường lành mạnh.

2.5. Quản trị

Là một quản trị viên, tôi muốn xem và xử lý các báo cáo để kiểm soát các nội dung vi phạm.

2.6. User Story – Chủ địa điểm

Là một chủ địa điểm, tôi muốn đăng ký địa điểm mới để đưa địa điểm của mình lên hệ thống.

Là một chủ địa điểm, tôi muốn cập nhật thông tin địa điểm để đảm bảo thông tin luôn chính xác.

Là một chủ địa điểm, tôi muốn xem các bài đánh giá của địa điểm mình quản lý để hiểu phản hồi từ người dùng.

Là một chủ địa điểm, tôi muốn phản hồi các bài đánh giá để giao tiếp với người dùng.

3. SEQUENCE DIAGRAM (MÔ TẢ TUẦN TỰ)
3.1. Ca sử dụng: Người dùng báo cáo bình luận

Người dùng nhấn nút Báo cáo trên giao diện.

Giao diện gửi yêu cầu tạo báo cáo lên Backend.

Backend kiểm tra trạng thái đăng nhập của người dùng.

Backend tạo bản ghi báo cáo trong cơ sở dữ liệu.

Hệ thống trả về thông báo báo cáo thành công cho người dùng.

3.2. Ca sử dụng: Trả lời bình luận

Người dùng nhập nội dung trả lời bình luận.

Giao diện gửi dữ liệu lên Backend.

Backend kiểm tra bình luận cha.

Backend lưu bình luận con vào cơ sở dữ liệu.

Hệ thống hiển thị bình luận mới theo cấu trúc cây.
3.3. Sequence Diagram – Chủ địa điểm đăng ký địa điểm

Chủ địa điểm chọn chức năng Đăng ký địa điểm trên giao diện.

Giao diện gửi thông tin địa điểm lên Backend.

Backend kiểm tra trạng thái đăng nhập và quyền Chủ địa điểm.

Backend lưu địa điểm với trạng thái Chờ duyệt.

Hệ thống thông báo đăng ký thành công cho Chủ địa điểm.
4. ACTIVITY DIAGRAM (SƠ ĐỒ HOẠT ĐỘNG)
4.1. Quy trình: Báo cáo nội dung

Bắt đầu

Người dùng chọn chức năng báo cáo

Chọn lý do báo cáo

Gửi báo cáo

Kiểm tra người dùng đã đăng nhập hay chưa

Nếu chưa: chuyển sang đăng nhập

Nếu đã đăng nhập: tiếp tục xử lý

Tạo báo cáo với trạng thái Chờ xử lý

Thông báo cho quản trị viên

Kết thúc

4.2. Quy trình: Bình luận lồng nhau

Bắt đầu

Người dùng nhập nội dung bình luận

Kiểm tra có phải trả lời bình luận khác hay không

Nếu không: tạo bình luận gốc

Nếu có: gán bình luận cha

Lưu bình luận

Hiển thị bình luận theo dạng cây

Kết thúc
4.3. Activity Diagram – Đăng ký địa điểm

Bắt đầu

Chủ địa điểm chọn Đăng ký địa điểm

Nhập thông tin địa điểm

Gửi yêu cầu

Hệ thống lưu địa điểm (trạng thái: Chờ duyệt)

Thông báo cho Quản trị viên

Kết thúc
