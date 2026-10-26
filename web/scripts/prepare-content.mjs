import fs from 'node:fs';
import path from 'node:path';
import { adaptImages, collectPages, sourceRoot, webRoot, generatedRoot, chapterNames } from './content.mjs';

const expected = path.resolve(webRoot, '.generated');
if (generatedRoot !== expected || !generatedRoot.startsWith(webRoot + path.sep)) throw new Error('Unsafe generated directory');
// This directory is generated exclusively by this script, never a source directory.
fs.rmSync(generatedRoot, { recursive: true, force: true });
fs.mkdirSync(path.join(generatedRoot, '.vitepress', 'theme'), { recursive: true });
const pages = collectPages();
for (const page of pages) {
  const destination = path.join(generatedRoot, page.locale, page.relative);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  const source = fs.readFileSync(path.join(sourceRoot, page.locale, page.relative), 'utf8');
  fs.writeFileSync(destination, adaptImages(source), 'utf8');
}
const enToc = ['# Table of Contents', '', '[Preface](00-preface.md)', ''];
for (let chapter = 1; chapter <= 16; chapter++) {
  enToc.push(`## ${chapter}. ${chapterNames.en[chapter - 1]}`, '');
  for (const page of pages.filter(page => page.locale === 'en' && page.chapter === chapter)) enToc.push(`- [${page.title}](${page.relative})`);
  enToc.push('');
}
enToc.push('[References](17-references.md)', '', '[Index](18-index.md)', '');
fs.writeFileSync(path.join(generatedRoot, 'en', '00-toc.md'), enToc.join('\n'));
pages.push({ locale: 'en', relative: '00-toc.md', route: '/en/00-toc', title: 'Table of Contents', chapter: null, generated: true });
fs.cpSync(path.join(sourceRoot, 'images'), path.join(generatedRoot, 'public', 'images'), { recursive: true });
fs.writeFileSync(path.join(generatedRoot, 'book-manifest.json'), JSON.stringify({ chapters: chapterNames, pages }, null, 2));
fs.writeFileSync(path.join(generatedRoot, '.vitepress', 'config.mts'), "export { default } from '../../.vitepress/config.mts'\n");
fs.writeFileSync(path.join(generatedRoot, '.vitepress', 'theme', 'index.ts'), "export { default } from '../../../.vitepress/theme/index'\n");
fs.writeFileSync(path.join(generatedRoot, 'index.md'), '---\nlayout: home\n---\n');
for (const locale of ['vi', 'en']) {
  fs.writeFileSync(path.join(generatedRoot, locale, 'index.md'), locale === 'vi' ? '---\nlayout: home\n---\n' : `# Psychology 2e\n\n[Open table of contents](/en/00-toc)\n\n[Start chapter 1](/en/01-introduction-to-psychology/00-1-introduction)\n\n[Trang chủ](/)\n`);
}
fs.writeFileSync(path.join(generatedRoot, 'about.md'), `# Về bộ sách\n\nĐây là bản đọc trên trình duyệt của giáo trình **Psychology 2e — OpenStax**, gồm bản tiếng Anh và bản dịch tiếng Việt trong dự án.\n\nBản dịch đang trong quá trình hiệu đính; việc có mặt trên website không đồng nghĩa với việc từng câu đã được thẩm định chuyên môn. Nội dung được giữ theo nguồn hiện có.\n\n## Nguồn và giấy phép\n\nTheo lời mở đầu của bản nguồn trong dự án, tác phẩm sử dụng giấy phép **CC BY-NC-SA 4.0**. Ghi nhận OpenStax, Rice University và các tác giả đóng góp; xem đầy đủ thông tin trong [lời mở đầu](/vi/00-preface). Các ghi nhận nguồn hình ảnh được giữ trong chú thích.\n\n- [Lời mở đầu tiếng Anh](/en/00-preface)\n- [Tài liệu tham khảo](/vi/17-references)\n- [Chỉ mục thuật ngữ](/vi/18-index)\n\n## Dữ liệu đọc\n\nDấu trang, cỡ chữ và vị trí đọc được lưu trên trình duyệt của thiết bị này. Chúng không đồng bộ giữa các máy và có thể bị xóa khi bạn xóa dữ liệu website. Nút “Xóa dữ liệu đọc” nằm dưới thanh công cụ của mỗi bài. Website không yêu cầu tài khoản.\n`);
console.log(`Đã chuẩn bị ${pages.length} trang sách và 349 ảnh từ nguồn; tệp nguồn được giữ nguyên.`);
