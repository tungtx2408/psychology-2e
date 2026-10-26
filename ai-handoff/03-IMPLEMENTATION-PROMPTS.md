# Prompt theo giai đoạn thực hiện

Mỗi khối dưới đây là một prompt có thể giao riêng. Đọc `STATUS.md` để bỏ qua phần đã hoàn tất và xác định phần cần bổ sung.

## A. Kiểm kê và xác minh hiện trạng

```text
Bạn đang ở root của dự án Psychology 2e Online. Đọc AGENTS.md,
ai-handoff/STATUS.md, web/README.md và ai-handoff/02-ARCHITECTURE.md.
Kiểm kê en/, vi/, images/, cấu hình web và lockfile. Đối chiếu baseline nguồn.
Đo số tệp, trang, anchor, callout và đường dẫn ảnh từ dữ liệu thực.
Xác định ứng dụng đã có gì, kiểm tra nào đã được chạy, phần nào còn thiếu.
Không sửa nội dung sách. Nếu yêu cầu hiện tại chỉ là phân tích, không sửa code.
Báo bằng tiếng Việt và nêu rõ bằng chứng, không coi trạng thái cũ là kết quả mới.
```

## B. Hoàn thiện pipeline xuất bản

```text
Hãy thực hiện hoặc sửa pipeline cho Psychology 2e Online theo AGENTS.md
và ai-handoff/02-ARCHITECTURE.md. Làm việc trong web/, đọc nguồn ở root.
Giữ nguyên en/, vi/, images/ và TRANSLATION_GUIDE.md.
Dùng VitePress 1.6.4, Vue 3, Node và pnpm theo lockfile hiện có.
Sinh web/.generated/ từ toàn bộ nguồn; tạo manifest điều hướng và mục lục Anh
trên bản sinh; sao chép ảnh; bảo toàn anchor/callout/caption/câu hỏi/thứ tự bài.
Chuyển callout Obsidian bằng parser token, không thay chuỗi mù trên toàn văn bản.
Kiểm tra đường dẫn tuyệt đối trước mọi thao tác xóa thư mục sinh.
Tạo hoặc hoàn thiện các kiểm tra có ý nghĩa với sách thật, gồm ảnh nhiều dòng,
callout lồng nhau, blockquote thường và ID trùng giữa các tệp.
Chạy build toàn bộ và kiểm tra liên kết của HTML đầu ra. Không tắt lỗi để build qua.
Bàn giao code chạy được, kết quả kiểm tra và cập nhật STATUS.md.
```

## C. Giao diện đọc sách

```text
Tiếp tục website Psychology 2e trong web/. Đọc AGENTS.md, STATUS.md,
01-PRODUCT-BRIEF.md và 02-ARCHITECTURE.md trước khi sửa.
Hoàn thiện UI đọc sách học thuật bằng tiếng Việt: trang chủ, 16 chương,
sidebar bài, outline trong bài, bài trước/bài sau, sáng/tối và layout mobile.
Dùng nội dung thật của chương 1, sau đó kiểm tra cả chương dài, bảng, ảnh và index.
Giữ giao diện nền giấy sáng, xanh trầm, khoảng cách thoáng và chữ tiếng Việt rõ.
Giới hạn độ rộng dòng đọc; ảnh không vượt khung; bảng cuộn bên trong khung.
Chuyển Việt–Anh tới đúng bài và giữ fragment khi có tương ứng.
Kiểm tra tương phản, focus, bàn phím và menu mobile trên trình duyệt.
Không đưa thông tin build, cache, parser hoặc công cụ AI vào luồng đọc sách.
Không thay nội dung sách để giải quyết lỗi UI. Cập nhật trạng thái theo bằng chứng.
```

## D. Công cụ đọc và tìm kiếm

```text
Hoàn thiện các công cụ đọc trong ứng dụng Psychology 2e hiện có.
Đọc hướng dẫn và code trước, không thay công nghệ nếu chưa có lý do.
Tìm toàn văn bằng MiniSearch và kiểm tra truy vấn có dấu/không dấu bằng tiếng Việt.
Kết quả phải mở đúng trang và mục. Đo dung lượng index và độ trễ nếu có vấn đề.
Thêm hoặc sửa đổi cỡ chữ, dấu trang, bài đọc gần nhất, vị trí đọc và phóng ảnh.
Dấu trang phải có nơi để mở lại, không chỉ hiện trạng thái trên bài đang đọc.
Lưu cục bộ có prefix riêng; chịu được dữ liệu hỏng hoặc storage bị chặn;
không đồng nhất việc lưu trên trình duyệt với đồng bộ tài khoản.
Không truy cập window/document/localStorage trong SSR trước khi có môi trường browser.
Thử thao tác thực, điều hướng qua lại và reload; kiểm tra Escape/focus của hộp ảnh.
Báo tính năng đã chạy, giới hạn còn lại và cập nhật STATUS.md.
```

## E. Kiểm tra và bàn giao bản cục bộ

```text
Hãy kiểm tra và hoàn thiện bản Psychology 2e chạy trên máy.
Đọc AGENTS.md, web/README.md, ai-handoff/STATUS.md và 04-ACCEPTANCE-AND-QA.md.
Chạy dependency theo lockfile, test, build và verify; xử lý lỗi có liên quan.
Mở bản build bằng HTTP, kiểm tra desktop/mobile, tìm kiếm, language switch,
anchor chỉ mục, ảnh/callout, dấu trang, cỡ chữ, tiếp tục đọc và giao diện tối.
Thử tệp doc-sach.bat hoặc Chay-Sach.ps1 từ đường dẫn Windows có dấu cách.
Kiểm tra server chỉ phục vụ dist và báo cổng bị chiếm rõ ràng.
Đối chiếu lại SHA-256 toàn bộ nguồn. Không gọi bản cục bộ là đã public deploy.
Bàn giao lệnh chạy độc lập, kết quả kiểm tra cụ thể và cập nhật STATUS.md/README.
Nếu thiếu công cụ browser, hoàn thành phần kiểm tra độc lập rồi ghi giới hạn đó.
```
