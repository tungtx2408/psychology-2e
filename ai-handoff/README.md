# Bộ prompt bàn giao — Psychology 2e Online

Bộ tài liệu giúp một mô hình AI khác hiểu mục tiêu, kiến trúc, cách thực hiện, kiểm chứng và xuất bản sách web. Dự án đã có ứng dụng tại `../web/`; hãy đọc hiện trạng trước khi tiếp tục.

## Bắt đầu

1. Mở thư mục gốc `E:\Vibe Code\Codex\psychology-2e` trong công cụ AI.
2. Yêu cầu AI đọc `AGENTS.md`, `ai-handoff/STATUS.md` và `web/README.md`.
3. Dùng prompt tổng `00-MASTER-PROMPT.md` hoặc prompt theo công việc trong `03-IMPLEMENTATION-PROMPTS.md`.
4. Yêu cầu kết quả có ứng dụng chạy được và bằng chứng kiểm chứng, không chỉ bản kế hoạch.

Nếu chuyển dự án sang máy khác, thay đường dẫn gốc bằng đường dẫn thực tế. Các tham chiếu bên trong tài liệu là tương đối với thư mục gốc, không phải phụ thuộc cứng vào ổ E:.

## Danh mục

| Tệp | Mục đích |
|---|---|
| [00-MASTER-PROMPT.md](00-MASTER-PROMPT.md) | Prompt tổng cho AI thực hiện hoặc tiếp tục trọn quy trình |
| [01-PRODUCT-BRIEF.md](01-PRODUCT-BRIEF.md) | Ý tưởng sản phẩm, trải nghiệm đọc, phạm vi |
| [02-ARCHITECTURE.md](02-ARCHITECTURE.md) | Công nghệ, dữ liệu, cấu trúc và quyết định kỹ thuật |
| [03-IMPLEMENTATION-PROMPTS.md](03-IMPLEMENTATION-PROMPTS.md) | Các prompt theo giai đoạn triển khai |
| [04-ACCEPTANCE-AND-QA.md](04-ACCEPTANCE-AND-QA.md) | Tiêu chí nghiệm thu và cách kiểm tra |
| [05-DEPLOYMENT-PROMPT.md](05-DEPLOYMENT-PROMPT.md) | Prompt chuẩn bị/xuất bản lên Cloudflare Pages |
| [06-CONTINUE-AND-REVIEW-PROMPTS.md](06-CONTINUE-AND-REVIEW-PROMPTS.md) | Prompt tiếp tục, rà soát, sửa lỗi và mở rộng |
| [STATUS.md](STATUS.md) | Trạng thái thực tế, cập nhật theo bằng chứng |
| [SOURCE_BASELINE.json](SOURCE_BASELINE.json) | SHA-256 của 725 tệp sách gốc, phục vụ bảo toàn nguồn |

## Prompt ngắn có thể gửi ngay

```text
Hãy tiếp tục dự án Psychology 2e Online trong thư mục đang mở.
Đọc AGENTS.md, ai-handoff/STATUS.md, web/README.md và
ai-handoff/00-MASTER-PROMPT.md trước khi thao tác.
Kiểm tra code và bản chạy hiện có, rồi thực hiện phần việc còn thiếu hoặc yêu cầu mới của tôi.
Giữ nguyên nguồn sách; làm việc trong web/. Giao tiếp bằng tiếng Việt.
Hoàn thành đến mức chạy được trên trình duyệt, kiểm tra phù hợp và cập nhật STATUS.md.
Chưa xuất bản ra Internet nếu yêu cầu mới của tôi chỉ là chạy cục bộ.
```

## Cách dùng các prompt theo giai đoạn

Các prompt là những công việc có thể giao riêng cho mô hình khác. Nếu ứng dụng đã có chức năng đó, AI phải kiểm tra rồi bổ sung thiếu sót, không dựng lại hoặc thay công nghệ chỉ để làm theo ví dụ. Không bắt buộc dùng nhiều AI hay chạy nhiều mô hình cùng lúc.

Bộ prompt không xác nhận các chức năng đã được kiểm chứng. Chỉ `STATUS.md` cùng kết quả chạy hiện tại là bằng chứng trạng thái. Các số liệu thống kê là snapshot ngày 26/10/2026 và phải được đo lại khi nguồn thay đổi hợp lệ.
