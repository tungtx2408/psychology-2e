# Đọc Psychology 2e trên trình duyệt

Ứng dụng VitePress đọc nội dung thật từ `../en/`, `../vi/`, `../images/`. Không cần tài khoản hoặc cơ sở dữ liệu để đọc cục bộ.

## Cách mở trên Windows

Nhấp đúp `../doc-sach.bat`. Tệp sẽ chuẩn bị bản web, kiểm tra liên kết rồi mở trình duyệt ở `http://127.0.0.1:4173/`. Giữ cửa sổ đang chạy; nhấn Ctrl+C để dừng. Mỗi lần khởi chạy sẽ dựng lại sách để phản ánh nội dung và code hiện tại.

Nếu cổng bị chiếm, đóng phiên cũ hoặc đặt `BOOK_PORT` sang cổng khác. Trình đọc chỉ lắng nghe trên máy này; chưa chia sẻ qua mạng LAN hay Internet.

Để chạy kiểm tra tự động mà không mở thêm cửa sổ trình duyệt, đặt `BOOK_NO_OPEN=1`. Thư mục `.pnpm-store/` ở root là cache dependency tự sinh, không phải nội dung sách.

Yêu cầu: Node.js hiện đại và pnpm. Môi trường bàn giao đã có Node.js 24.22.1 và pnpm 11.25.0 trong runtime của Codex; script tự tìm runtime này khi cần. Trên máy khác, cài Node.js LTS và dùng pnpm. pnpm 11 cần Node.js tương thích với phiên bản đó; Node.js 24 LTS là lựa chọn cho bộ bàn giao này.

## Lệnh cho người phát triển

Thực hiện tại thư mục `web/`:

```powershell
pnpm install --frozen-lockfile
pnpm build
pnpm test
pnpm verify
pnpm preview
```

Hoặc dùng PowerShell, kể cả khi pnpm chưa có trên PATH nhưng runtime Codex còn hiện diện:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\Chay-Sach.ps1 -Action test
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\Chay-Sach.ps1 -Action build
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\Chay-Sach.ps1 -Action verify
```

Chạy build trước test trên checkout mới vì kiểm tra HTTP dùng bản `dist` thật. `pnpm dev` mở môi trường biên tập tại `http://127.0.0.1:5173/`; theo dõi thay đổi nguồn và chuẩn bị lại nội dung. Thay đổi source trong tác vụ hiệu đính phải được người dùng yêu cầu riêng; website mặc định bảo toàn nguồn.

## Tính năng

- Trang chủ và mục lục 16 chương; mỗi tệp Markdown là một trang đọc.
- Tiếng Việt / tiếng Anh: chuyển đúng bài tương ứng và giữ fragment thuật ngữ khi có.
- Tìm toàn văn bằng MiniSearch, chuẩn hóa dấu tiếng Việt trong từ tìm kiếm.
- Mục lục bên trái, đề mục trong bài, bài trước / bài tiếp theo.
- Callout Obsidian được chuyển bằng plugin khi render, giữ nguyên nguồn.
- Giao diện sáng/tối; cỡ chữ; đánh dấu bài; tiếp tục đọc; phóng lớn hình minh họa.
- Dữ liệu đọc được lưu trong localStorage, chỉ trên trình duyệt đang dùng. Trang chủ có các bài đã đánh dấu. Có nút xóa dữ liệu đọc.

## Cấu trúc

```text
web/
  .vitepress/          # Cấu hình và giao diện viết tay
  scripts/            # Chuẩn bị nội dung, kiểm tra và phục vụ HTML
  tests/              # Kiểm tra dựa trên dữ liệu sách thật
  .generated/         # Bản Markdown dành cho web, tự sinh
  dist/               # HTML/CSS/JS/ảnh đã dựng, tự sinh
  package.json
  pnpm-lock.yaml
  Chay-Sach.ps1
```

`scripts/prepare-content.mjs` sao chép nội dung vào `.generated/`, điều chỉnh đường dẫn ảnh trên bản sinh, tạo mục lục tiếng Anh và manifest điều hướng. Nó không dịch hoặc biên tập sách. `.generated/` có thể bị xóa và dựng lại. Kiểm tra đường dẫn bảo vệ thư mục nguồn trước khi làm sạch.

`scripts/verify-build.mjs` kiểm tra tệp, ảnh và fragment của HTML đầu ra; đối chiếu anchor/callout nguồn và SHA-256 của 725 tệp. Xem `../ai-handoff/SOURCE_BASELINE.json`.

## Xuất bản sau này

Đích đề xuất: Cloudflare Pages, build từ gốc kho bằng `cd web && pnpm install --frozen-lockfile && pnpm build && pnpm verify`; thư mục đầu ra `web/dist`. Cần cấu hình Node.js 24 tương thích pnpm 11. Nếu nền tảng dùng root directory `web`, lệnh bỏ `cd web`, đầu ra `dist`. Bản deploy chỉ chứa `dist`, không chứa thư mục gốc.

`BOOK_BASE` mặc định `/`. Khi xuất bản dưới đường dẫn con, phải dùng base có dấu `/` ở cả đầu và cuối và kiểm tra lại build, đường dẫn ảnh, search, language switch. Chưa coi chế độ này là đã kiểm chứng nếu chưa thử bản tương ứng.

Tài liệu chính thức: [VitePress 1.x](https://vuejs.github.io/vitepress/v1/), [Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-vitepress-site/).
