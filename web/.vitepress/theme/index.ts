import DefaultTheme from 'vitepress/theme';
import BookLayout from './BookLayout.vue';
import BookHome from './BookHome.vue';
import './style.css';

export default { extends: DefaultTheme, Layout: BookLayout, enhanceApp({ app }) { app.component('BookHome', BookHome); } };
