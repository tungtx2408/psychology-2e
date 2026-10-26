# Hướng dẫn cho mô hình AI làm việc tại dự án

## Ngôn ngữ và phạm vi

- Luôn giao tiếp và viết tài liệu cho người dùng bằng tiếng Việt. Giữ nguyên ngôn ngữ của code, API, command và thông báo lỗi.
- Dự án là sách Psychology 2e song ngữ. Website nằm trong `web/`; bộ prompt và trạng thái bàn giao nằm trong `ai-handoff/`.
- Đọc `ai-handoff/README.md`, `ai-handoff/STATUS.md`, `web/README.md` và tài liệu kiến trúc trước khi sửa. Tiếp tục từ hiện trạng, không dựng lại ứng dụng nếu đã có.
- Yêu cầu mới nhất của người dùng quyết định phạm vi. Mặc định của lần bàn giao này là website chạy cục bộ; chưa yêu cầu xuất bản lên Internet.

## Bảo toàn sách

- `en/`, `vi/`, `images/`, `TRANSLATION_GUIDE.md` là nguồn biên tập. Trong tác vụ website, đọc nguồn nhưng không di chuyển, đổi tên hoặc sửa nội dung nguồn.
- Khi người dùng yêu cầu dịch/hiệu đính rõ ràng, tuân thủ `TRANSLATION_GUIDE.md`; việc chỉnh nội dung được ủy quyền riêng và cần cập nhật baseline có giải thích.
- Không sửa `web/.generated/` hoặc `web/dist/` bằng tay. Chúng được sinh từ nguồn và code.
- Không đổi anchor `term-xxxxx`; ID có thể lặp giữa các tệp nên khóa định danh phải bao gồm đường dẫn tệp và fragment.
- Không gộp thuật ngữ chỉ vì trùng tên tiếng Anh; một thuật ngữ có thể có nhiều nghĩa.
- Không tự ghi đè `SOURCE_BASELINE.json` để làm kiểm tra vượt qua.

## Công nghệ và kiểm chứng

- VitePress 1.6.4, Vue 3, Node.js, pnpm; xem phiên bản chính xác trong `web/package.json` và lockfile.
- Chỉ sinh trang từ danh sách nguồn cho phép; không đưa prompt, baseline, mã ứng dụng hoặc bí mật vào bản xuất bản.
- Sau thay đổi xử lý Markdown, chạy kiểm tra nội dung thực, build và kiểm tra HTML đầu ra. Đừng tắt lỗi liên kết để có build xanh.
- Thử tương tác trình duyệt khi thay đổi UI. Kiểm tra kích thước desktop và mobile phù hợp.
- Ghi riêng: đã triển khai, đã kiểm tra tự động, đã kiểm tra trình duyệt, đã xuất bản. Chỉ ghi trạng thái có bằng chứng.
- Không tự cài toàn cục, đổi chính sách Windows, tạo tài khoản dịch vụ hoặc chọn kho Git/đích xuất bản thay người dùng.
- Không thao tác dự án khác ngoài thư mục này. Không để node_modules hoặc cache lọt vào gói xuất bản.
- Các script xóa dữ liệu sinh ra phải kiểm tra đường dẫn tuyệt đối nằm trong thư mục được phép trước khi xóa đệ quy.

## Bàn giao

- Duy trì `ai-handoff/STATUS.md` sau khi có thay đổi đáng kể; nêu lệnh chạy thực tế và giới hạn chưa kiểm chứng.
- Mô hình mới có thể bắt đầu bằng `ai-handoff/00-MASTER-PROMPT.md`. Các prompt theo giai đoạn là lựa chọn cho công việc cụ thể, không phải yêu cầu phải làm lại toàn bộ.
