<script setup>
import { ref, onMounted } from 'vue';
import { withBase, useRouter, useRoute } from 'vitepress';
import manifest from '../../.generated/book-manifest.json';
const last = ref(null), bookmarks = ref([]);
const router = useRouter(), route = useRoute();
onMounted(() => { try {
  const candidate = JSON.parse(localStorage.getItem('psy2e:last') || 'null');
  if (manifest.pages.some(page => page.route === candidate?.route)) last.value = candidate;
  const saved = JSON.parse(localStorage.getItem('psy2e:bookmarks') || '{}');
  bookmarks.value = manifest.pages.filter(page => Object.hasOwn(saved, page.route));
} catch {}
  // The homepage uses the Vietnamese locale so its search indexes the actual book.
  if (route.path === withBase('/')) router.go(withBase('/vi/'));
});
const chapters = manifest.chapters.vi.map((name, i) => ({ name, number: i + 1, page: manifest.pages.find(p => p.locale === 'vi' && p.chapter === i + 1) }));
const sections = ['Nền tảng & giác quan', 'Học tập & nhận thức', 'Phát triển & nhân cách', 'Con người & xã hội', 'Sức khỏe & trị liệu'];
function group(i) { return i < 5 ? 0 : i < 8 ? 1 : i < 11 ? 2 : i < 13 ? 3 : 4; }
</script>

<template>
  <main class="book-home">
    <section class="book-hero">
      <div class="hero-copy">
        <p class="eyebrow">TỦ SÁCH MỞ · OPENSTAX</p>
        <h1>Hiểu tâm trí.<br><em>Hiểu con người.</em></h1>
        <p class="hero-description">Khám phá khoa học về suy nghĩ, cảm xúc và hành vi qua giáo trình <strong>Tâm lý học 2e</strong>. Một hành trình từ những tế bào thần kinh đến cách chúng ta sống cùng nhau.</p>
        <div class="hero-actions"><a class="primary-action" :href="withBase('/vi/01-introduction-to-psychology/00-1-introduction')">Bắt đầu đọc <span aria-hidden="true">↗</span></a><a class="secondary-action" :href="withBase('/en/00-toc')">Đọc bản tiếng Anh →</a></div>
        <a v-if="last?.route?.startsWith('/') && !last.route.startsWith('//')" class="continue-reading" :href="withBase(last.route)">Tiếp tục đọc: {{ last.title }} →</a>
      </div>
      <aside class="hero-book" aria-label="Psychology 2e, giáo trình của OpenStax">
        <div class="cover-top"><span>OPENSTAX</span><span>02 / EDITION</span></div>
        <div class="cover-orbit" aria-hidden="true"><div></div><div></div><div></div><span>ψ</span></div>
        <div class="cover-title">Psychology<span>2e</span></div><p>TÂM LÝ HỌC<br>Khoa học về tâm trí & hành vi</p>
        <div class="cover-bottom"><span>BẢN ĐỌC SONG NGỮ</span><span>VI / EN</span></div>
      </aside>
    </section>
    <section class="book-facts" aria-label="Thông tin bộ sách"><div><strong>16</strong><span>chương khám phá</span></div><div><strong>02</strong><span>ngôn ngữ đối chiếu</span></div><div><strong>349</strong><span>hình minh họa</span></div><p>Đọc theo chương.<br>Tra cứu theo điều bạn tò mò.</p></section>
    <section v-if="bookmarks.length" class="saved-reading"><p class="eyebrow">TRANG ĐÃ ĐÁNH DẤU</p><a v-for="item in bookmarks" :key="item.route" :href="withBase(item.route)">{{ item.title }} <span>{{ item.locale.toUpperCase() }} ↗</span></a></section>
    <section class="chapter-library" id="chapters"><div class="section-heading"><div><p class="eyebrow">HÀNH TRÌNH KHÁM PHÁ</p><h2>Mỗi chương, một góc nhìn.</h2></div><a :href="withBase('/vi/00-toc')">Xem mục lục đầy đủ ↗</a></div>
      <div class="chapter-grid"><a v-for="(chapter, i) in chapters" :key="chapter.number" class="chapter-card" :href="withBase(chapter.page.route)"><span class="chapter-number">{{ String(chapter.number).padStart(2, '0') }}</span><span class="chapter-category">{{ sections[group(i)] }}</span><h3>{{ chapter.name }}</h3><span class="chapter-arrow" aria-hidden="true">↗</span></a></div>
    </section>
    <section class="reading-invitation"><div><p class="eyebrow">KHÔNG CẦN ĐỌC TỪ ĐẦU</p><h2>Một khái niệm mới.<br>Một cách hiểu sâu hơn.</h2><p>Dùng tìm kiếm để tìm chủ đề bạn quan tâm, hoặc mở chỉ mục để khám phá các thuật ngữ tâm lý học.</p></div><a class="primary-action" :href="withBase('/vi/18-index')">Tra cứu thuật ngữ ↗</a></section>
  </main>
</template>
