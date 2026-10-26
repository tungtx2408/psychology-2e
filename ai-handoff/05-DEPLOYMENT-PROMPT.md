# Prompt triển khai Internet — Cloudflare Pages

Đây là prompt dùng khi người dùng muốn xuất bản. Bản bàn giao hiện tại chỉ chạy cục bộ; không chứa thông tin tài khoản, remote Git hoặc tên miền được chỉ định.

---

Hãy chuẩn bị và triển khai Psychology 2e Online lên Cloudflare Pages dựa trên ứng dụng hiện có trong `web/`. Đọc `AGENTS.md`, `ai-handoff/STATUS.md`, `web/README.md` và tài liệu QA trước khi thao tác. Giao tiếp bằng tiếng Việt.

## Chuẩn bị độc lập

1. Kiểm tra phiên bản Node/pnpm tương thích package và lockfile. Dùng `pnpm install --frozen-lockfile`.
2. Chạy test, build và verify. Đối chiếu baseline nguồn. Không xuất bản bản đang lỗi.
3. Kiểm tra `web/dist` chỉ chứa tệp công khai cần thiết, gồm thông tin nguồn/giấy phép từ sách.
4. Kiểm tra tài liệu Cloudflare hiện hành; xác định Git integration hoặc Direct Upload phù hợp công cụ/quyền sẵn có.
5. Tạo hướng dẫn build và rollback cụ thể. Nếu thiếu tài khoản/đích, hoàn tất bản build cùng tài liệu rồi hỏi đúng thông tin còn thiếu.

## Cấu hình đề xuất

- Nếu Cloudflare dùng root directory là root của kho: build `cd web && pnpm install --frozen-lockfile && pnpm build && pnpm verify`, output `web/dist`.
- Nếu root directory được cấu hình là `web`: build `pnpm install --frozen-lockfile && pnpm build && pnpm verify`, output `dist`.
- Cấu hình Node.js 24 tương thích pnpm 11; xác nhận pnpm có trong môi trường build hoặc kích hoạt đúng phiên bản theo `packageManager`.
- Chạy bằng base `/` cho tên miền gốc. Không tự thêm fallback mọi URL vào index.html để che lỗi trang sâu.
- Nếu dùng Git integration, watch paths phải bao gồm `en/**`, `vi/**`, `images/**`, `web/**` và baseline được verify; thay nguồn phải kích hoạt build dù root build nằm trong `web`.
- Token/quyền truy cập đặt trong secret store của nền tảng, không trong repo, command history hoặc log.
- Chỉ triển khai tới tài khoản/kho/project và mức công khai người dùng đã chọn. Không tự tạo kho công khai hoặc đổi quyền dự án có sẵn.

## Xác minh sau deploy

Lấy URL thật do nền tảng trả về; mở trang chủ, một URL sâu Việt/Anh, chỉ mục có fragment, ảnh, tìm kiếm và một lần reload trực tiếp. Phân biệt preview URL với production URL. Chỉ ghi “đã xuất bản” khi có bằng chứng deploy thành công.

Cập nhật `STATUS.md`: project/URL công khai được phép ghi, ngày deploy, cấu hình build, phiên bản/commit nếu có, kết quả smoke test và phương án rollback về deployment trước. Không để credential vào tài liệu.

Nguồn chính thức: [Cloudflare Pages với VitePress](https://developers.cloudflare.com/pages/framework-guides/deploy-a-vitepress-site/).
