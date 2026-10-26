<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
const dialog = ref(null), image = ref(null);
async function open(event) {
  const target = event.target;
  if (!(target instanceof HTMLImageElement) || !target.closest('.vp-doc') || target.closest('a')) return;
  image.value = { src: target.currentSrc || target.src, alt: target.alt };
  await nextTick(); dialog.value?.showModal();
}
onMounted(() => document.addEventListener('click', open));
onUnmounted(() => document.removeEventListener('click', open));
</script>
<template>
  <dialog ref="dialog" class="image-viewer" aria-label="Xem hình minh họa" @click="event => { if (event.target === dialog) dialog.close(); }">
    <button type="button" aria-label="Đóng hình minh họa" @click="dialog.close()">Đóng ×</button>
    <img v-if="image" :src="image.src" :alt="image.alt">
  </dialog>
</template>
