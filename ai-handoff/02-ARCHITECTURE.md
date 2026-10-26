# Kiến trúc và công nghệ

## Sơ đồ dữ liệu

```text
en/ + vi/ + images/                  (nguồn, bảo toàn)
           ↓ prepare-content.mjs
web/.generated/                     (bản dành cho web)
           ↓ VitePress + theme + callout plugin
web/dist/                           (HTML/CSS/JS/ảnh)
           ↓ HTTP trên localhost hoặc hosting tĩnh
trình duyệt                         (đọc, tìm kiếm, localStorage)
```

## Các quyết định

| Quyết định | Lý do và giới hạn |
|---|---|
| VitePress 1.6.4 + Vue 3 | Dựng Markdown, có theme tài liệu, sidebar, outline, tìm kiếm và tùy chỉnh. Phiên bản đã khóa trong package/lockfile. |
| Node.js + pnpm | Dễ chạy trên Windows và môi trường build. Bản bàn giao dùng Node 24, pnpm 11; launcher có đường tìm runtime Codex dự phòng. |
| Sinh bản sao trong `.generated/` | Thích nghi đường dẫn ảnh và thêm trang web mà không sửa sách. Chỉ thư mục sinh được làm sạch. |
| Giữ đường dẫn chương và tên tệp | Giảm rủi ro phá liên kết và ánh xạ bài giữa hai ngôn ngữ. |
| MiniSearch local | Không cần dịch vụ tìm kiếm bên ngoài; đánh giá dung lượng index và độ trễ trên thiết bị thật khi tối ưu. |
| localStorage | Dữ liệu đọc chỉ trên thiết bị hiện tại, không có đăng nhập hoặc đồng bộ. |
| Hosting tĩnh | Chỉ cần xuất bản `dist`; backend không cần cho chức năng hiện tại. |

## Ánh xạ nội dung

- URL của `vi/08-memory/01-8-1-how-memory-functions.md` là `/vi/08-memory/01-8-1-how-memory-functions`.
- Bài đối chiếu thay `/vi/` bằng `/en/`, giữ phần đường dẫn và fragment.
- Thêm mục lục Anh trong bản sinh vì nguồn Anh không có `00-toc.md`. Không tạo tệp này vào `en/`.
- Ảnh trong nguồn dùng `../../images/...`; bản sinh dùng `/images/...`, ảnh được sao chép vào thư mục public để build.
- `BOOK_BASE` mặc định `/`. Nếu dùng đường dẫn con, kiểm chứng lại mọi xử lý URL, gồm link Vue viết tay và localStorage; chưa mặc định rằng cấu hình base là đủ.
- Chỉ dùng locale, chương và tên file cho manifest; không tải toàn bộ nội dung sách vào component trang chủ.

## Markdown và callout

Plugin markdown-it nhận marker Obsidian ở cấp token blockquote, chuyển thành `<aside>` có `data-callout`, giữ nguyên phần nội dung phía trong. Phải xử lý cả ảnh/đoạn nhiều dòng trong callout, callout lồng nhau, và không biến blockquote thường thành callout.

Giữ nguyên `<a id="term-xxxxx"></a>`, anchor hình/bảng và các thẻ HTML hợp lệ của nguồn. Không đánh lại số ID hoặc suy luận ID là duy nhất giữa các tệp. Số dòng, số từ và độ dài bản dịch không phải chứng minh tương đương nội dung.

## Tệp quan trọng

- `web/scripts/content.mjs`: định vị root, đọc danh sách trang và thích nghi đường dẫn ảnh.
- `web/scripts/prepare-content.mjs`: tạo nội dung web, manifest, các trang bổ sung và sao chép ảnh.
- `web/scripts/callouts.mjs`: plugin callout.
- `web/.vitepress/config.mts`: locales, sidebar, tìm kiếm, đường dẫn đầu ra.
- `web/.vitepress/theme/`: trang chủ, layout, công cụ đọc, phóng ảnh, CSS.
- `web/scripts/dev.mjs`: môi trường phát triển và theo dõi nguồn.
- `web/scripts/serve.mjs`: HTTP server chỉ phục vụ `dist` trên loopback.
- `web/scripts/verify-build.mjs`: kiểm tra HTML, liên kết, ảnh, fragment và anchor/callout nguồn.
- `web/scripts/verify-source.mjs`: đối chiếu baseline SHA-256.

## Dữ liệu trình duyệt

Các khóa có prefix `psy2e:`; gồm bài gần nhất, bookmarks, font và vị trí từng route. Giao diện phải chịu được storage không khả dụng. Không chèn giá trị lưu vào HTML thô. Dấu trang phải trỏ tới route hợp lệ thuộc manifest.

## Nguồn tài liệu chính thức

Đã tham khảo ngày 26/10/2026; kiểm tra lại khi nâng cấp:

- [VitePress 1.x](https://vuejs.github.io/vitepress/v1/)
- [Markdown và liên kết](https://vuejs.github.io/vitepress/v1/guide/markdown)
- [Đa ngôn ngữ](https://vuejs.github.io/vitepress/v1/guide/i18n)
- [Tìm kiếm](https://vuejs.github.io/vitepress/v1/reference/default-theme-search)
- [Cloudflare Pages với VitePress](https://developers.cloudflare.com/pages/framework-guides/deploy-a-vitepress-site/)
