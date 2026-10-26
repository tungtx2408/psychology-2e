# Ý tưởng và yêu cầu sản phẩm

## Định hướng

Psychology 2e Online là bản sách đọc trên trình duyệt của dữ liệu trong dự án. Đối tượng là người học và người đọc tiếng Việt muốn tiếp cận tâm lý học có cấu trúc, tra thuật ngữ và đối chiếu tiếng Anh.

Nguồn Markdown tiếp tục là nơi biên tập chính. Website là cách trình bày và đọc nguồn đó. Không đánh đồng việc xuất bản kỹ thuật với việc đã hiệu đính khoa học.

## Trải nghiệm chính

- Khám phá: mở trang chủ, chọn chương, xem phần giới thiệu và tiếp tục theo thứ tự.
- Đọc có mục tiêu: tìm một khái niệm, mở đoạn liên quan, xem minh họa và ghi nhớ bài để quay lại.
- Đối chiếu: chuyển từ bài Việt sang đúng bài Anh và giữ vị trí anchor thuật ngữ nếu có.
- Tiếp tục: trở về trang chủ để mở bài đã đọc gần nhất hoặc bài đã đánh dấu.
- Di động: mục lục gọn, thao tác bằng chạm, nội dung đọc được khi chiều ngang nhỏ.

## Thiết kế

Phong cách thư viện học thuật hiện đại: nền giấy sáng nhẹ, xanh trầm làm màu nhấn, không gian thoáng, tương phản rõ. Nội dung đọc dùng serif có hỗ trợ tiếng Việt; điều hướng dùng sans-serif. Giao diện tối cần giữ rõ chữ, caption và callout.

Trang chủ có giới thiệu ngắn, nút bắt đầu đọc, bản tiếng Anh, các chương và đường vào chỉ mục. Trang bài đọc ưu tiên nội dung, hạn chế thông tin kỹ thuật. Trên màn hình rộng có mục lục bên trái và đề mục trong bài bên phải.

## Phạm vi phiên bản đầu

Toàn bộ nội dung có sẵn; tìm kiếm; điều hướng; hai ngôn ngữ; chỉ mục; callout; ảnh; công cụ đọc lưu cục bộ. Website chạy trên máy người dùng và có bản tĩnh đủ điều kiện chuẩn bị hosting.

## Các mở rộng để sau

- So sánh hai bản cạnh nhau và đồng bộ cuộn: cần ánh xạ đoạn, không giả định số dòng tương ứng.
- Ghi chú/highlight, xuất/nhập dữ liệu đọc.
- Đọc offline/PWA: phải kiểm tra dung lượng cache, cập nhật và xóa cache cũ.
- Tài khoản và đồng bộ đa thiết bị: cần thiết kế backend, quyền riêng tư và sao lưu.
- Quiz tương tác: chỉ dùng đáp án có nguồn hợp lệ hoặc được người dùng cung cấp.
- PDF/EPUB: là quy trình xuất riêng với kiểm tra định dạng, không coi chức năng in trình duyệt là EPUB.

Không tự thêm các mở rộng trên vào MVP khi chưa có yêu cầu.

## Tiêu chí thành công

Người dùng mở được sách bằng một tệp khởi chạy, đọc một chương thật, tra một thuật ngữ và mở đúng bài đối chiếu. Mô hình AI tiếp theo có thể tiếp tục từ tài liệu và trạng thái mà không cần biết cuộc trò chuyện trước đó.
