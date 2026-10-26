# Psychology 2e — Sách đọc song ngữ Việt–Anh

Bản sách web của giáo trình **Psychology 2e (OpenStax)**, xây dựng từ nội dung Markdown có sẵn trong dự án. Có 16 chương, tìm kiếm toàn văn, mục lục, chỉ mục thuật ngữ và công cụ đọc trên trình duyệt.

## Mở sách trên Windows

1. Cài Node.js 24 kèm npm nếu máy chưa có.
2. Tải hoặc clone toàn bộ kho, giữ nguyên cấu trúc thư mục.
3. Nhấp đúp [doc-sach.bat](doc-sach.bat).
4. Đợi dựng sách và kiểm tra hoàn tất; trình duyệt tự mở tại `http://127.0.0.1:4173/`.

Lần đầu cần Internet để tải dependency. Giữ cửa sổ đang chạy khi đọc; nhấn Ctrl+C để dừng. Nếu pnpm chưa có trên PATH, launcher có thể sử dụng pnpm được gọi qua npx hoặc runtime Codex hiện có.

## Chạy bằng dòng lệnh

Yêu cầu Node.js 24 và pnpm 11.25.0. Từ thư mục gốc:

```powershell
cd web
pnpm install --frozen-lockfile
pnpm build
pnpm test
pnpm verify
pnpm preview
```

`pnpm dev` chạy môi trường phát triển ở `http://127.0.0.1:5173/`. Trên checkout mới, build trước test vì kiểm tra HTTP sử dụng bản `dist` thật.

## Tính năng

- Nội dung tiếng Việt và tiếng Anh, mục lục 16 chương và điều hướng bài trước/bài sau.
- Tìm kiếm có dấu/không dấu, chỉ mục dẫn tới thuật ngữ trong từng bài.
- Chuyển sang đúng bài đối chiếu Việt–Anh, giữ fragment thuật ngữ.
- Hiển thị callout, ảnh và bảng; phóng lớn ảnh minh họa.
- Đổi cỡ chữ, sáng/tối, đánh dấu bài và tiếp tục đọc.
- Giao diện thích ứng với máy tính và màn hình nhỏ.

Dữ liệu đọc được lưu trong trình duyệt trên thiết bị hiện tại, chưa đồng bộ đa thiết bị. Bản dịch vẫn đang được hiệu đính; việc website chạy được không đồng nghĩa với việc từng câu đã được thẩm định chuyên môn.

## Cấu trúc

| Đường dẫn | Nội dung |
|---|---|
| [en/](en/) | 187 tệp Markdown nguồn tiếng Anh |
| [vi/](vi/) | 188 tệp Markdown tiếng Việt, gồm mục lục bổ sung |
| [images/](images/) | 349 hình ảnh dùng chung |
| [web/](web/) | Ứng dụng VitePress, Vue và các công cụ kiểm tra |
| [ai-handoff/](ai-handoff/) | Bộ prompt, kiến trúc, QA và trạng thái để AI khác tiếp tục |
| [TRANSLATION_GUIDE.md](TRANSLATION_GUIDE.md) | Quy trình và quy chuẩn dịch thuật |
| [AGENTS.md](AGENTS.md) | Hướng dẫn làm việc trong dự án |

Tệp nguồn được giữ nguyên khi dựng web. `.gitattributes` bảo toàn xuống dòng của sách để việc kiểm tra SHA-256 vẫn đúng sau khi clone trên Windows. `web/.generated/`, `web/dist/`, `node_modules/`, cache và ảnh kiểm tra được tạo cục bộ, không đưa vào kho.

## Dành cho mô hình AI tiếp tục dự án

Đọc [hướng dẫn bàn giao](ai-handoff/README.md), [prompt tổng](ai-handoff/00-MASTER-PROMPT.md), [kiến trúc](ai-handoff/02-ARCHITECTURE.md) và [trạng thái](ai-handoff/STATUS.md) trước khi sửa. Cách chạy và triển khai chi tiết ở [web/README.md](web/README.md).

## Xuất bản website

Đích đề xuất là Cloudflare Pages với thư mục đầu ra `web/dist`. Đưa mã lên GitHub chưa tự xuất bản website; xem [prompt triển khai](ai-handoff/05-DEPLOYMENT-PROMPT.md) để chuẩn bị bước hosting riêng.

## Nguồn và ghi nhận

Giáo trình gốc: **Psychology 2e — OpenStax, Rice University và các tác giả đóng góp**. Thông tin giấy phép **CC BY-NC-SA 4.0** và ghi nhận tác phẩm được giữ trong [lời mở đầu tiếng Anh](en/00-preface.md) và [bản Việt](vi/00-preface.md). Ghi nhận hình ảnh nằm trong chú thích tương ứng của sách.
