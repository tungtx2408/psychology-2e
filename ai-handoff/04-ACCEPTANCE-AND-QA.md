# Tiêu chí nghiệm thu và kiểm tra

## Trạng thái cần phân biệt

| Trạng thái | Bằng chứng tối thiểu |
|---|---|
| Đã triển khai | Code và chức năng hiện diện |
| Đã kiểm tra tự động | Lệnh đã chạy, exit code và kết quả cụ thể |
| Đã kiểm tra trình duyệt | Tương tác thật và quan sát kết quả |
| Đã xuất bản | URL thật, trạng thái hosting và kiểm tra ở URL đó |

Build thành công chưa chứng minh thao tác tìm kiếm hoặc localStorage hoạt động. Link trong Markdown đúng chưa chứng minh link của HTML đầu ra đúng.

## Nội dung và pipeline

- Tất cả nguồn `en/`, `vi/` có trang tương ứng; không chỉ chương mẫu.
- Có mục lục đầy đủ cả hai bản; mục lục Anh bổ sung chỉ nằm trong bản sinh.
- Đủ 349 tệp ảnh, 352 vị trí ảnh mỗi bản; giữ caption/alt text, cả trường hợp nhiều dòng.
- Đủ 2.079 anchor và 267 callout mỗi bản theo snapshot; không dùng tổng số thay cho kiểm tra từng ID/đích.
- Từng liên kết tương đối và fragment được resolve theo trang chứa nó.
- ID trùng giữa các tệp được kiểm tra theo cặp file/fragment.
- Không vô tình xuất bản `ai-handoff`, baseline, source code, dependency hoặc tệp môi trường.
- Chạy đối chiếu SHA-256 725 tệp nguồn; ghi rõ nếu có thay đổi được người dùng yêu cầu riêng.

## Trình duyệt

Thử tối thiểu các luồng sau trên bản build:

1. Trang chủ → chương 1 → bài tiếp theo → bài trước.
2. Bài 1.1 Việt → Anh → Việt; lặp lại với fragment `term-00001`.
3. Mở chỉ mục và chọn một thuật ngữ; xác nhận trang và anchor đích.
4. Tìm “trí nhớ” và “tri nho”; mở kết quả và xác nhận đúng đoạn liên quan.
5. Mở chương có ảnh và callout nhiều dòng; ảnh tải thành công, marker callout không bị lộ.
6. Phóng ảnh rồi đóng bằng nút và Escape; focus hoạt động hợp lý.
7. Tăng/giảm cỡ chữ, reload, xác nhận thiết lập được giữ.
8. Đánh dấu bài, về trang chủ, mở lại từ danh sách dấu trang; bỏ dấu trang.
9. Cuộn bài dài, rời bài rồi trở lại; dùng nút về vị trí đọc và kiểm tra bài gần nhất.
10. Chuyển sáng/tối, kiểm tra chữ, ảnh, bảng và callout.
11. Viewport 390×844 và desktop khoảng 1280×800; không cuộn ngang toàn trang.
12. Mở trực tiếp URL bài sâu rồi reload; xác nhận HTTP server/hosting resolve được URL sạch.

## Lệnh kiểm tra

Trong `web/`, với pnpm có trên PATH:

```powershell
pnpm install --frozen-lockfile
pnpm build
pnpm test
pnpm verify
pnpm preview
```

Tại máy bàn giao có thể dùng `Chay-Sach.ps1 -Action build|test|verify` như README. Test HTTP cần bản build có sẵn. Không ghi một lệnh “đã chạy” nếu chỉ đọc cấu hình mà chưa thực thi.

## Nội dung báo cáo

Ghi ngày, môi trường, phiên bản, lệnh, phạm vi và kết quả; lỗi được sửa; giới hạn chưa thử. Không ghi PASS cho luồng chưa thao tác. Cảnh báo bundle/search lớn cần được đánh giá bằng dung lượng và trải nghiệm, không chỉ nâng ngưỡng cảnh báo để che.
