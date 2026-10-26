# Trạng thái bàn giao — 26/10/2026

## Phạm vi đã được người dùng yêu cầu

Tạo bộ prompt cho mô hình AI khác và xây dựng luôn bản sách web chạy trên máy tại thư mục này. Website nằm trong `web/`, nguồn sách ở root. Chưa có yêu cầu xuất bản công khai hoặc đích hosting được chỉ định.

## Đã triển khai

- Bộ prompt về sản phẩm, công nghệ, cách thực hiện, QA, tiếp tục và triển khai hosting.
- VitePress 1.6.4 + Vue 3.5.22; pnpm lockfile; Node runtime hiện tại 24.22.1.
- Pipeline lấy nguồn thật, 376 trang sách gồm 375 tệp nguồn hai ngôn ngữ và một mục lục Anh bổ sung.
- Trang chủ, sidebar 16 chương, outline, điều hướng bài, tìm kiếm, chuyển bài Việt–Anh.
- Adapter cho 6 loại callout đang có; giữ anchor và ảnh.
- Công cụ cỡ chữ, dấu trang, bài gần nhất, vị trí đọc, sáng/tối, phóng ảnh.
- Tệp mở sách Windows và HTTP server chỉ phục vụ bản build trên loopback.
- Baseline SHA-256 của toàn bộ 725 tệp nguồn.

## Đã kiểm tra tự động trên bản cuối

- 7/7 kiểm tra Node đã qua: bảo toàn nguồn, ánh xạ trang, chuyển ảnh nhiều dòng, anchor/ảnh toàn bộ sách, callout thật, callout lồng nhau và HTTP server.
- Build toàn bộ VitePress thành công; bản cuối dựng trong khoảng 15 giây ở môi trường bàn giao, không coi thời gian này là cam kết cho máy khác.
- Verify bản cuối: 376 trang sách, 349 ảnh, 84.210 tham chiếu nội bộ, 725 tệp nguồn giữ nguyên SHA-256.
- Đã chạy trực tiếp `doc-sach.bat` qua Windows với đường dẫn có dấu cách, cổng thử 4189 và `BOOK_NO_OPEN=1`; launcher đã build, verify và phục vụ trang chủ/trang sâu HTTP 200.
- Đã chạy các nhánh PowerShell `build`, `test`, `verify`. Chưa kiểm tra trên máy Windows sạch không có runtime Codex.
- Có cảnh báo kích thước chunk khi build: chỉ mục tìm kiếm Việt khoảng 2,07 MB, Anh 1,99 MB chưa nén. Tìm kiếm chạy được; chưa đo hiệu năng trên điện thoại thật hoặc mạng chậm.

## Đã kiểm tra trình duyệt

- Trang chủ, mở chương, đọc bài và điều hướng sang bản tiếng Anh.
- Tìm “tri nho” và “trí nhớ” đều có kết quả thuộc chương Trí nhớ; đã mở kết quả tới trang và fragment.
- Chuyển Việt → Anh giữ `#term-00001`; chỉ mục mở tới bài 8.3 và `#term-00014`, anchor tồn tại. Liên kết chỉ mục nhiều dòng được xác nhận bằng phím Enter do giới hạn vùng bấm của công cụ tự động.
- Cỡ chữ và dấu trang giữ sau reload; dấu trang hiện trên trang chủ.
- Bài đọc gần nhất và khôi phục vị trí đọc: thử bài 8.3, vị trí khoảng 21.169 px được khôi phục.
- Ảnh tải được, mở hộp phóng lớn, đóng bằng Escape; giao diện tối bật/tắt được.
- Viewport 1280×800 và 390×844: không cuộn ngang toàn trang ở trang đã thử; menu mục lục mobile mở/đóng được. Đây là giả lập viewport, không phải điện thoại vật lý.
- Không có console error/warn trong lượt kiểm tra cuối.
- Ảnh kiểm chứng ở `web/test-results/home-desktop.png` và `home-mobile.png`.

## GitHub và xuất bản website

Đã khởi tạo kho Git cục bộ trên nhánh `main` theo yêu cầu chuyển dự án lên GitHub. Đã thêm README gốc, quy tắc loại cache/build/dependency và `.gitattributes` để bảo toàn byte của nguồn sách khi clone trên Windows. Đã chuẩn bị 763 tệp khoảng 67 MB; kiểm tra dữ liệu Git xác nhận cả 725 tệp nguồn khớp SHA-256 và không có build/cache hay mẫu token/private key trong phần chuẩn bị tải lên.

Đã đưa dự án lên [tungtx2408/psychology-2e](https://github.com/tungtx2408/psychology-2e) ngày 26/10/2026, giữ chế độ **Private** của kho người dùng chỉ định. Remote `origin`: `https://github.com/tungtx2408/psychology-2e.git`; nhánh `main` theo dõi `origin/main`. Commit khởi tạo: `ebcea4a5c2bc66a2b78c7d8b81e24b3ee9faf49b`; đã đối chiếu SHA của commit trên máy và GitHub. Có 763 tệp được quản lý trong Git, không gồm dependency, cache hoặc bản build.

Kiểm tra trạng thái Git thực tế trước khi tiếp tục, không khởi tạo lại hoặc ghi đè kho đã có. Chưa deploy Cloudflare Pages, chưa gắn tên miền và chưa kiểm tra trên thiết bị điện thoại thật. Chưa có backend, tài khoản, đồng bộ đa thiết bị, PWA hoặc đối chiếu hai cột. Đưa mã lên GitHub chưa tự xuất bản website.

Trong phiên này có khác biệt tài khoản Windows sở hữu `.git`; lệnh chạy bằng tài khoản khác dùng `git -c safe.directory="E:/Vibe Code/Codex/psychology-2e" ...` cho riêng thư mục dự án. Không cấu hình tin cậy mọi thư mục. Tên tác giả Git lấy từ tài khoản GitHub đã xác nhận, email dùng dạng noreply.

## Tiếp tục

Đọc `web/README.md` để chạy hoặc nhấp đúp `doc-sach.bat`. Các server thử nghiệm được dừng khi kết thúc phiên; launcher sẽ mở lại sách tại cổng 4173. Khi sửa code, cập nhật phần bằng chứng kiểm chứng ở đây, không chỉ đổi trạng thái bằng nhận định. Nguồn sách đã có bản Việt nhưng chưa được hiệu đính từng câu trong tác vụ website.
