<script setup>
import DefaultTheme from 'vitepress/theme';
import BookTools from './BookTools.vue';
import BookHome from './BookHome.vue';
import ImageViewer from './ImageViewer.vue';
import { useData } from 'vitepress';
const { page } = useData();
</script>

<template>
  <DefaultTheme.Layout>
    <template #home-hero-before><BookHome v-if="['index.md', 'vi/index.md'].includes(page.relativePath)" /></template>
    <template #doc-before><BookTools /></template>
    <template #doc-after><p class="book-source-note">Nội dung theo bản nguồn của dự án · Bản Việt đang được hiệu đính.</p></template>
  </DefaultTheme.Layout>
  <ImageViewer />
</template>
