# Kế Hoạch & Quy Trình Dịch Thuật Sách "Psychology 2e" (OpenStax)

Tài liệu này mô tả chi tiết chiến lược, quy chuẩn dịch thuật và kế hoạch triển khai cuốn sách giáo trình **Psychology 2e** (OpenStax) từ tiếng Anh (`en/`) sang tiếng Việt (`vi/`).

---

## 1. Tổng Quan Quy Mô Dự Án

- **Tác phẩm:** *Psychology 2e* (OpenStax, bản cập nhật DSM-5-TR)
- **Quy mô:** 
  - 16 chương chuyên đề + Lời mở đầu (Preface) + References + Index.
  - Tổng cộng **187 file Markdown**, khoảng **~370.000 từ**.
- **Cấu trúc thư mục:**
  - Nguồn tiếng Anh: `Books/psychology-2e/en/`
  - Bản dịch tiếng Việt: `Books/psychology-2e/vi/`
  - Thư mục hình ảnh dùng chung: `Books/psychology-2e/images/`

---

## 2. Nguyên Tắc & Quy Chuẩn Kỹ Thuật

1. **Phương pháp dịch cuốn chiếu (Batch Translation):**
   - Không dịch ồ ạt nhiều file cùng lúc để tránh quá tải ngữ cảnh (context window) và đảm bảo văn phong học thuật chỉn chu.
   - Xử lý từng mẻ nhỏ (1–2 file mỗi lượt hoặc từng mục trọn vẹn).
2. **Bảo toàn thẻ HTML Anchors & Chỉ mục (Crucial):**
   - Các file có gắn thẻ định danh thuật ngữ dạng `<a id="term-XXXXX"></a>**Term**`.
   - **Bắt buộc giữ nguyên** mã anchor `<a id="term-XXXXX"></a>` để liên kết trong file `18-index.md` hoạt động chính xác.
   - Dịch tên thuật ngữ kèm chú thích tiếng Anh nếu cần (ví dụ: `<a id="term-00001"></a>**Tâm lý học (Psychology)**`).
3. **Bảo toàn cấu trúc Markdown & Callout:**
   - Giữ nguyên các khối Callout Obsidian: `> [!info]`, `> [!tip]`, `> [!note]`, v.v. Dịch tiêu đề bên trong (ví dụ: `### Mục tiêu Học tập`, `### Kết nối Thực tế`).
   - Đường dẫn hình ảnh dạng `../../images/img_xxxxxxxx.jpg`: giữ nguyên đường dẫn, dịch nội dung `Alt text` và `Caption`.
4. **Ngắt dòng ngữ nghĩa (Semantic Line Breaks):**
   - Tách mỗi câu văn hoặc mệnh đề trọn ý thành một dòng riêng biệt, giúp dễ theo dõi Git Diff và thuận tiện cho việc rà soát/chỉnh sửa câu chữ.
5. **Văn phong học thuật:**
   - Sử dụng hệ thống thuật ngữ tâm lý học chuẩn mực tại Việt Nam (theo quy chuẩn ĐHQG và DSM-5).
   - Câu văn diễn đạt tự nhiên, mạch lạc, chính xác về mặt khoa học hành vi và thần kinh học.

---

## 3. Lộ Trình Triển Khai (7 Giai Đoạn)

### Giai Đoạn 1: Xây Dựng Master Glossary (Khởi Động - Ưu Tiên Cao Nhất)
- **Mục tiêu:** Thống nhất toàn bộ thuật ngữ chuyên ngành trước khi dịch văn bản chính.
- **Phạm vi:** Dịch trọn bộ **16 file `key-terms.md`** của 16 chương:
  1. `01-introduction-to-psychology/05-1-key-terms.md`
  2. `02-psychological-research/05-2-key-terms.md`
  3. `03-biopsychology/06-3-key-terms.md`
  4. `04-states-of-consciousness/07-4-key-terms.md`
  5. `05-sensation-and-perception/07-5-key-terms.md`
  6. `06-learning/05-6-key-terms.md`
  7. `07-thinking-and-intelligence/07-7-key-terms.md`
  8. `08-memory/05-8-key-terms.md`
  9. `09-lifespan-development/05-9-key-terms.md`
  10. `10-emotion-and-motivation/05-10-key-terms.md`
  11. `11-personality/10-11-key-terms.md`
  12. `12-social-psychology/08-12-key-terms.md`
  13. `13-industrial-organizational-psychology/05-13-key-terms.md`
  14. `14-stress-lifestyle-and-health/06-14-key-terms.md`
  15. `15-psychological-disorders/12-15-key-terms.md`
  16. `16-therapy-and-treatment/06-16-key-terms.md`
- **Nguyên tắc:** Toàn bộ bản dịch nội dung sau này phải đối chiếu và tuân thủ tuyệt đối bảng từ vựng này.

---

### Giai Đoạn 2: Nền Tảng Khoa Học & Sinh Học (Chương 0 – 5)
- `00-preface.md`: Lời mở đầu cuốn sách.
- **Chương 1:** Giới thiệu về Tâm lý học (Lịch sử, các trường phái, cơ hội nghề nghiệp).
- **Chương 2:** Phương pháp nghiên cứu Tâm lý học (Đạo đức, thực nghiệm, thống kê).
- **Chương 3:** Tâm lý học Sinh học (Tế bào thần kinh, cấu trúc não bộ, hệ nội tiết, di truyền).
- **Chương 4:** Các trạng thái ý thức (Giấc ngủ, giấc mơ, thôi miên, chất tác động tâm thần).
- **Chương 5:** Cảm giác và Tri giác (Thị giác, thính giác, các giác quan khác và quá trình xử lý tri giác).

---

### Giai Đoạn 3: Nhận Thức & Cơ Chế Học Tập (Chương 6 – 8)
- **Chương 6:** Học tập (Điều kiện hóa cổ điển Pavlov, điều kiện hóa tạo tác Skinner, học qua quan sát Bandura).
- **Chương 7:** Tư duy & Trí thông minh (Nhận thức, giải quyết vấn đề, ngôn ngữ, đo lường IQ).
- **Chương 8:** Trí nhớ (Mã hóa, lưu trữ, phục hồi, các vùng não liên quan, các vấn đề về trí nhớ và quên lãng).

---

### Giai Đoạn 4: Sự Phát Triển, Động Lực & Nhân Cách (Chương 9 – 11)
- **Chương 9:** Tâm lý học phát triển theo vòng đời (Từ thời kỳ trước sinh đến tuổi già, cái chết và sự mất mát).
- **Chương 10:** Động lực & Cảm xúc (Thuyết nhu cầu, đói ăn, hành vi tính dục, các lý thuyết về cảm xúc).
- **Chương 11:** Nhân cách (Freud & phân tâm học, thuyết học tập, nhân văn, thuyết đặc điểm cá nhân, trắc nghiệm nhân cách).

---

### Giai Đoạn 5: Tâm Lý Xã Hội, Tổ Chức & Sức Khỏe (Chương 12 – 14)
- **Chương 12:** Tâm lý học xã hội (Tự nhận thức, sự phục tùng, tuân thủ, định kiến, bạo lực, hành vi vì xã hội).
- **Chương 13:** Tâm lý học công nghiệp - tổ chức (Tuyển dụng, đánh giá hiệu quả làm việc, văn hóa doanh nghiệp, yếu tố con người).
- **Chương 14:** Căng thẳng, Lối sống & Sức khỏe (Tác nhân gây stress, bệnh tật liên quan stress, phương pháp ứng phó, tâm lý học tích cực & hạnh phúc).

---

### Giai Đoạn 6: Tâm Lý Bệnh Học & Can Thiệp Trị Liệu (Chương 15 – 16)
- **Chương 15:** Các rối loạn tâm lý (Phân loại theo chuẩn DSM-5-TR: Rối loạn lo âu, trầm cảm, lưỡng cực, tâm thần phân liệt, rối loạn nhân cách, v.v.).
- **Chương 16:** Trị liệu & Điều trị (Lịch sử điều trị, liệu pháp tâm lý cá nhân/nhóm, liệu pháp hành vi - nhận thức, điều trị y sinh học).

---

### Giai Đoạn 7: Hoàn Thiện Mục Lục, Index & Rà Soát Cuối Cùng
- Bản dịch và liên kết chỉ mục `18-index.md`.
- Rà soát các tài liệu tham khảo `17-references.md`.
- Kiểm tra toàn bộ tính toàn vẹn của các liên kết chéo (internal links) và hình ảnh.

---

## 4. Quy Trình Làm Việc Mỗi Phiên Dịch (Workflow)

```
[Chọn Chương / Nhóm File] 
       │
       ▼
[Đọc Key Terms tương ứng để lấy thuật ngữ chuẩn]
       │
       ▼
[Dịch nội dung: Giữ anchors, callout, đường dẫn ảnh, ngắt câu ngữ nghĩa]
       │
       ▼
[Review & Chỉnh lý câu từ nếu người dùng yêu cầu]
       │
       ▼
[Git Commit đánh dấu mốc hoàn thành]
```
