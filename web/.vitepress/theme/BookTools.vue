<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useRoute, useData, withBase } from 'vitepress';
const route = useRoute(); const { page } = useData();
const font = ref(19), saved = ref(false), progress = ref(0), resume = ref(0), ready = ref(false);
const currentHash = ref('');
const routePath = () => { let p = route.path; const base = import.meta.env.BASE_URL; if (base !== '/' && p.startsWith(base)) p = '/' + p.slice(base.length); return p.replace(/\.html$/, ''); };
const isBook = computed(() => /\/(vi|en)\//.test(route.path));
const other = computed(() => { const p = routePath(); return p.replace(/^\/(vi|en)\//, (_, locale) => locale === 'vi' ? '/en/' : '/vi/'); });
const otherLabel = computed(() => routePath().startsWith('/vi/') ? 'English ↗' : 'Tiếng Việt ↗');
function read(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }
function write(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }
function applyFont() { document.documentElement.style.setProperty('--book-font-size', `${font.value}px`); }
function resize(delta) { font.value = Math.min(25, Math.max(16, font.value + delta)); write('psy2e:font', font.value); applyFont(); }
function toggleBookmark() { const bookmarks = read('psy2e:bookmarks', {}); saved.value = !saved.value; if (saved.value) bookmarks[routePath()] = page.value.title; else delete bookmarks[routePath()]; write('psy2e:bookmarks', bookmarks); }
function syncPage() { if (!ready.value || !isBook.value) return; saved.value = Boolean(read('psy2e:bookmarks', {})[routePath()]); resume.value = read(`psy2e:position:${routePath()}`, 0); progress.value = 0; write('psy2e:last', { route: routePath(), title: page.value.title }); }
let timer;
function scroll() { const max = document.documentElement.scrollHeight - innerHeight; progress.value = max > 0 ? Math.round(scrollY / max * 100) : 100; clearTimeout(timer); if (isBook.value && scrollY > 0) { const key = `psy2e:position:${routePath()}`; const y = scrollY; timer = setTimeout(() => write(key, y), 250); } }
function clearData() { try { Object.keys(localStorage).filter(key => key.startsWith('psy2e:')).forEach(key => localStorage.removeItem(key)); } catch {} saved.value = false; resume.value = 0; font.value = 19; applyFont(); }
function updateHash() { currentHash.value = window.location.hash; }
function changeLanguage(event) {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault(); window.location.assign(withBase(other.value) + window.location.hash);
}
function resumeReading() { window.scrollTo({ top: resume.value, behavior: 'smooth' }); }
onMounted(() => { ready.value = true; const stored = Number(read('psy2e:font', 19)); font.value = Number.isFinite(stored) ? Math.max(16, Math.min(25, stored)) : 19; applyFont(); syncPage(); updateHash(); window.addEventListener('scroll', scroll, { passive: true }); window.addEventListener('hashchange', updateHash); });
watch(() => route.path, async () => { clearTimeout(timer); await nextTick(); syncPage(); updateHash(); });
onUnmounted(() => { clearTimeout(timer); window.removeEventListener('scroll', scroll); window.removeEventListener('hashchange', updateHash); });
</script>

<template>
  <div v-if="isBook" class="book-tools-wrap">
    <div class="book-tools" aria-label="Công cụ đọc sách"><span class="reading-label">GÓC ĐỌC SÁCH</span><div class="tool-buttons"><button type="button" @click="resize(-1)" aria-label="Giảm cỡ chữ" :disabled="font <= 16">A−</button><button type="button" @click="resize(1)" aria-label="Tăng cỡ chữ" :disabled="font >= 25">A+</button><button type="button" @click="toggleBookmark" :aria-pressed="saved">{{ saved ? 'Đã đánh dấu ✓' : 'Đánh dấu' }}</button><a :href="withBase(other) + currentHash" @click="changeLanguage">{{ otherLabel }}</a></div></div>
    <div class="reading-progress" role="progressbar" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100" aria-label="Tiến độ đọc bài"><span :style="{ width: progress + '%' }"></span></div>
    <div class="reading-options"><button v-if="resume > 150" type="button" @click="resumeReading">Về vị trí đã đọc ↓</button><button type="button" @click="clearData">Xóa dữ liệu đọc</button></div>
  </div>
</template>
