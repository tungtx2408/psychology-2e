import { defineConfig } from 'vitepress';
import manifest from '../.generated/book-manifest.json';
import { obsidianCallouts } from '../scripts/callouts.mjs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const webRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = process.env.BOOK_BASE || '/';
function sidebar(locale: 'vi' | 'en') {
  const pages = manifest.pages.filter(page => page.locale === locale);
  return [
    { text: 'Bắt đầu', items: [{ text: 'Mục lục toàn thư', link: `/${locale}/00-toc` }, { text: 'Lời mở đầu', link: `/${locale}/00-preface` }] },
    ...manifest.chapters[locale].map((name, index) => ({
      text: `${index + 1}. ${name}`, collapsed: true,
      items: pages.filter(page => page.chapter === index + 1).map(page => ({ text: page.title, link: page.route }))
    })),
    { text: 'Tra cứu', items: [{ text: 'Tài liệu tham khảo', link: `/${locale}/17-references` }, { text: 'Chỉ mục thuật ngữ', link: `/${locale}/18-index` }] }
  ];
}
export default defineConfig({
  base, lang: 'vi', title: 'Tâm lý học 2e', description: 'Đọc, khám phá và tra cứu giáo trình Psychology 2e bằng tiếng Việt và tiếng Anh.',
  cleanUrls: true, outDir: path.join(webRoot, 'dist'), cacheDir: path.join(webRoot, '.generated', '.cache'),
  head: [['meta', { name: 'theme-color', content: '#f7f6f1' }]],
  locales: { vi: { label: 'Tiếng Việt', lang: 'vi', title: 'Tâm lý học 2e' }, en: { label: 'English', lang: 'en', title: 'Psychology 2e' } },
  markdown: { breaks: false, config: md => { md.use(obsidianCallouts); } },
  themeConfig: {
    nav: [{ text: 'Đọc sách', link: '/vi/00-toc' }, { text: 'Thuật ngữ', link: '/vi/18-index' }, { text: 'Về bộ sách', link: '/about' }],
    sidebar: { '/vi/': sidebar('vi'), '/en/': sidebar('en') },
    outline: { level: [2, 3], label: 'Trong bài này' },
    docFooter: { prev: 'Bài trước', next: 'Bài tiếp theo' },
    sidebarMenuLabel: 'Mục lục', returnToTopLabel: 'Về đầu trang', darkModeSwitchLabel: 'Giao diện',
    lightModeSwitchTitle: 'Giao diện sáng', darkModeSwitchTitle: 'Giao diện tối',
    search: { provider: 'local', options: {
      translations: { button: { buttonText: 'Tìm trong sách', buttonAriaLabel: 'Tìm trong sách' }, modal: { noResultsText: 'Không tìm thấy kết quả', resetButtonTitle: 'Xóa nội dung tìm', displayDetails: 'Hiện đoạn trích', backButtonTitle: 'Đóng tìm kiếm', footer: { selectText: 'chọn', navigateText: 'di chuyển', closeText: 'đóng' } } },
      miniSearch: { options: { processTerm: (term: string) => term.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'd').toLowerCase() } }
    } },
    footer: { message: 'Psychology 2e · OpenStax / Rice University · CC BY-NC-SA 4.0', copyright: 'Bản dịch tiếng Việt đang được hiệu đính.' }
  }
});
