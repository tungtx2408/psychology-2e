# Prompt tiếp tục, rà soát và mở rộng

## Tiếp tục sau khi đổi mô hình

```text
Tiếp tục Psychology 2e Online từ thư mục hiện tại. Đọc AGENTS.md,
ai-handoff/STATUS.md, web/README.md và các tài liệu ai-handoff liên quan.
Kiểm tra code cùng kết quả mới nhất trước khi quyết định phần việc tiếp theo.
Giữ nguyên nguồn sách trong tác vụ web. Hoàn thành yêu cầu mới nhất của tôi,
chạy kiểm tra tương xứng và cập nhật trạng thái. Đừng dựng lại phần đã chạy tốt.
Nếu thiếu thông tin, tiếp tục phần độc lập rồi hỏi phần thực sự cần thiết.
```

## Review có bằng chứng

```text
Review ứng dụng Psychology 2e trong web/. Đọc hướng dẫn dự án và trạng thái.
Ưu tiên lỗi người dùng gặp: sai nội dung, mất ảnh/anchor, điều hướng sai,
SSR/hydration, tìm kiếm tiếng Việt, storage, giao diện mobile, launcher Windows.
Đối chiếu đầu ra thật với nguồn; không chỉ đọc số lượng hay cấu hình.
Mỗi phát hiện cần tệp/dòng, điều kiện tái hiện, tác động và cách sửa đề xuất.
Đừng coi lỗi hoặc cách diễn đạt trong nguyên tác là lỗi của pipeline web.
Nếu tôi chỉ yêu cầu review, báo phát hiện trước và chưa sửa code.
```

## Sửa một lỗi cụ thể

```text
Hãy tái hiện và sửa lỗi tôi vừa mô tả trong Psychology 2e Online.
Đọc AGENTS.md và trạng thái; xác định lớp gây lỗi: nguồn, chuẩn bị nội dung,
Markdown renderer, URL/base, theme, lưu trữ trình duyệt hoặc HTTP/hosting.
Trong phạm vi website, sửa lớp chuyển đổi/code thay vì sửa sách gốc.
Thêm kiểm tra ngăn tái diễn nếu lỗi có ý nghĩa và có thể tự động kiểm chứng.
Chạy kiểm tra tập trung, build/verify khi liên quan và thử lại đúng luồng lỗi.
Bàn giao nguyên nhân, thay đổi, bằng chứng và giới hạn, cập nhật STATUS.md.
```

## Thêm đối chiếu hai cột Việt–Anh

```text
Thiết kế và triển khai chế độ đối chiếu Việt–Anh cho ứng dụng hiện có.
Giữ route bài đọc đơn và nút chuyển ngôn ngữ đang hoạt động.
Ánh xạ theo cặp tệp và anchor có sẵn; không giả định số dòng hoặc đoạn tương ứng.
Desktop hiển thị hai cột rõ ràng, mobile cho đổi tab ngôn ngữ.
Đồng bộ cuộn nếu làm được phải theo mốc nội dung, cho phép tắt.
Giữ tìm kiếm, ảnh, callout và fragment hoạt động; không nhân bản ID trùng trong DOM
khi hai bài được render cùng trang, phải namespace hoặc tách môi trường phù hợp.
Không sửa anchor trong nguồn. Thử nội dung dài và cập nhật tài liệu/QA.
```

## Tối ưu tốc độ đọc và tìm kiếm

```text
Đo hiệu năng Psychology 2e Online trước khi tối ưu: bundle, chỉ mục tìm kiếm,
trang References/Index dài, ảnh và thời gian tương tác trên mobile.
Tìm nguyên nhân bằng bằng chứng, giữ chất lượng tìm kiếm tiếng Việt và đủ nội dung.
Ưu tiên tải theo nhu cầu, phân chia chỉ mục hoặc loại trừ nội dung khỏi search
chỉ khi vẫn đáp ứng yêu cầu và giải thích rõ thay đổi phạm vi tìm kiếm.
Không nâng ngưỡng cảnh báo như cách sửa duy nhất. Đo lại và báo so sánh trước/sau.
```
