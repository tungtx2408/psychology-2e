# Prompt tổng: xây dựng và tiếp tục Psychology 2e Online

Sao chép phần dưới cho mô hình AI có quyền đọc/ghi và chạy lệnh trong thư mục dự án.

---

Bạn là kỹ sư phụ trách một website sách song ngữ, đồng thời chịu trách nhiệm về trải nghiệm đọc và chất lượng bàn giao. Hãy thực hiện công việc cụ thể, chạy thử và xử lý lỗi cho đến khi bản web sử dụng được. Luôn giao tiếp bằng tiếng Việt; giữ nguyên code, command, API và thông báo lỗi.

## Mục tiêu

Chuyển nội dung Markdown của giáo trình Psychology 2e thành website đọc trên trình duyệt, ưu tiên tiếng Việt và có bản tiếng Anh đối chiếu. Ứng dụng phải đọc được toàn bộ 16 chương, có mục lục, tìm kiếm, chỉ mục thuật ngữ, hình ảnh và công cụ đọc cơ bản. Website phải chạy cục bộ trên Windows; chuẩn bị được bản tĩnh để xuất bản sau.

Thư mục gốc hiện tại là `E:\Vibe Code\Codex\psychology-2e`. Nếu môi trường đang mở ở đường dẫn khác, xác minh root từ `en/`, `vi/`, `images/` và `TRANSLATION_GUIDE.md`, dùng root thực tế. Ứng dụng nằm trong `web/`, tài liệu tiếp tục nằm trong `ai-handoff/`.

## Việc đầu tiên

1. Đọc `AGENTS.md`, `ai-handoff/STATUS.md`, `web/README.md`, `TRANSLATION_GUIDE.md` và các tài liệu sản phẩm/kiến trúc/QA trong `ai-handoff/`.
2. Kiểm tra code và chạy bản hiện có. Nếu ứng dụng đã được triển khai, tiếp tục trên nền đó, không tạo scaffold ghi đè.
3. Kiểm tra phiên bản Node.js, công cụ quản lý gói và lockfile. Không phụ thuộc vào runtime của một máy nếu có thể hỗ trợ Node.js chuẩn.
4. Nêu ngắn gọn phần đã có, phần cần làm và giới hạn môi trường. Tiến hành các phần đã đủ thông tin; chỉ hỏi dữ liệu còn thiếu thực sự ảnh hưởng kết quả.

## Dữ liệu hiện có

- `en/`: 187 tệp Markdown; `vi/`: 188 tệp, thêm mục lục `00-toc.md`.
- Mỗi ngôn ngữ có 184 tệp thuộc 16 chương; các tệp còn lại là lời mở đầu, tài liệu tham khảo, chỉ mục và mục lục.
- `images/`: 349 ảnh chung.
- Mỗi bản có 2.079 anchor HTML, trong đó 1.100 anchor thuật ngữ; 352 vị trí chèn ảnh và 267 callout.
- 16 bảng thuật ngữ có 845 mục; chỉ mục có 984 dòng mục.
- Bản Việt đã có nội dung trên toàn bộ chương nhưng chưa có chứng nhận hiệu đính từng câu. References giữ nguyên nguồn là tình trạng hiện có.
- Các số trên là snapshot, đo lại thay vì mặc định chúng luôn đúng.

## Phạm vi và bảo toàn

- Giữ nguyên `en/`, `vi/`, `images/` và `TRANSLATION_GUIDE.md` khi xây dựng website. Không đổi tên, di chuyển hoặc sửa bản dịch để chữa lỗi render.
- Mọi thích nghi cú pháp được thực hiện trên lớp xử lý hoặc bản sinh trong `web/.generated/`.
- Giữ nguyên anchor, đường dẫn đích logic, thứ tự nội dung, câu hỏi, bảng, caption, alt text và ghi nhận nguồn ảnh.
- Không tự bổ sung đáp án, dịch lại chương, cập nhật tiêu chuẩn y khoa hoặc diễn giải lại nội dung sách.
- ID thuật ngữ không duy nhất trên toàn sách; dùng cặp đường dẫn và fragment.
- Đối chiếu baseline SHA-256; không ghi đè baseline để che thay đổi.

## Công nghệ được chọn

- VitePress bản ổn định 1.6.4; Vue 3; cấu hình TypeScript; Node.js; pnpm và lockfile.
- Nội dung được dựng sẵn thành HTML, có điều hướng phía trình duyệt.
- MiniSearch tích hợp, tìm kiếm tiếng Việt có dấu/không dấu cần kiểm tra thực tế.
- localStorage cho dấu trang, vị trí đọc và cỡ chữ; ghi rõ chỉ lưu trên thiết bị hiện tại.
- Git/GitHub phục vụ quản lý phiên bản khi có kho; Cloudflare Pages là đích xuất bản đề xuất.
- Chưa cần backend, cơ sở dữ liệu, tài khoản hoặc dịch vụ AI cho bản đọc cơ bản.
- Giữ phiên bản đã khóa nếu không có lý do nâng cấp. Đọc tài liệu chính thức đúng phiên bản trước khi dùng API; không trộn API của VitePress 2 alpha vào 1.x.

## Trải nghiệm phải có

1. Trang chủ giới thiệu sách, lối vào đọc và danh sách 16 chương.
2. Mục lục chương/bài bên trái; đề mục bài bên phải khi có đủ không gian; bài trước/bài sau theo thứ tự sách.
3. Đọc trên desktop và mobile, ảnh co theo khung, bảng cuộn ngang hợp lý.
4. Tìm nội dung thật của sách; kết quả mở đúng trang và fragment.
5. Chuyển Việt–Anh ở đúng bài tương ứng, giữ anchor nếu hợp lệ; không đưa người đọc về đầu sách khi đã có bài tương ứng.
6. Chỉ mục thuật ngữ dẫn đúng tới các anchor có sẵn.
7. Callout Obsidian được trình bày rõ, không để lộ marker `[!info]` như văn bản.
8. Sáng/tối, đổi cỡ chữ, lưu dấu trang, tiếp tục đọc và phóng lớn ảnh.
9. Trang về nguồn sách/bản dịch, giữ ghi nhận và thông tin giấy phép đang có trong nguồn.

## Quy trình thực hiện

A. Kiểm kê, xác minh baseline và cấu trúc hiện có.
B. Hoàn thiện pipeline nguồn → bản Markdown sinh → HTML, manifest điều hướng và adapter callout.
C. Hoàn thiện UI trên nội dung chương thật; áp dụng cho toàn bộ sách.
D. Thêm công cụ đọc và tìm kiếm; xử lý SSR/hydration, dữ liệu lưu hỏng hoặc bị chặn khi cần.
E. Chạy kiểm tra nội dung thực, build toàn bộ, kiểm tra liên kết/anchor/ảnh trên HTML đầu ra.
F. Kiểm tra trình duyệt các tương tác đại diện, desktop/mobile, ghi lại bằng chứng.
G. Bàn giao lệnh và tệp khởi chạy Windows, cập nhật trạng thái và công việc còn lại.

Nếu thiếu quyền mạng, công cụ hoặc thông tin tài khoản xuất bản, hoàn thành các phần độc lập và báo giới hạn cụ thể. Không giả lập kết quả thành công. Yêu cầu xuất bản công khai phải chỉ rõ đích/tài khoản/quyền truy cập; áp dụng yêu cầu mới nhất của người dùng, không lặp lại câu hỏi đã được trả lời.

## Tiêu chí bàn giao

- Cài dependency theo lockfile, chạy được website từ thư mục này.
- Build thành công và không bỏ qua lỗi liên kết.
- Mọi trang nguồn có trang đích, ảnh tồn tại, anchor và callout bảo toàn.
- Source SHA-256 giữ nguyên so với baseline trừ thay đổi nguồn được ủy quyền riêng.
- Báo riêng: Đã triển khai / Đã kiểm tra tự động / Đã kiểm tra trình duyệt / Đã xuất bản.
- Cập nhật `ai-handoff/STATUS.md`, `web/README.md` theo lệnh và đường dẫn thực tế.
- Kết quả cuối cho người dùng: cách mở sách, đường dẫn tài liệu/prompt, kiểm tra đã chạy, giới hạn và phần chưa làm. Không chỉ trả lại kế hoạch.
