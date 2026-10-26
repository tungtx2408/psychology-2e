import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const webRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const sourceRoot = path.resolve(webRoot, '..');
export const generatedRoot = path.join(webRoot, '.generated');
export function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name, 'en', { numeric: true }))
    .flatMap(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
}
export function plainTitle(markdown) {
  return (markdown.match(/^#\s+(.+)$/m)?.[1] || '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`]/g, '').trim();
}
export function adaptImages(markdown) {
  // Only rewrite image destinations; prose, term IDs, captions and links remain intact.
  return markdown.replace(/(!\[[\s\S]*?\]\()((?:\.\.\/)+images\/[^)]+)(\))/g,
    (_, prefix, destination, suffix) => `${prefix}/images/${destination.split('/').at(-1)}${suffix}`);
}
export const chapterNames = {
  vi: ['Giới thiệu về tâm lý học', 'Nghiên cứu tâm lý học', 'Tâm lý học sinh học', 'Các trạng thái ý thức', 'Cảm giác và tri giác', 'Học tập', 'Tư duy và trí thông minh', 'Trí nhớ', 'Phát triển suốt đời', 'Cảm xúc và động lực', 'Nhân cách', 'Tâm lý học xã hội', 'Tâm lý học công nghiệp và tổ chức', 'Căng thẳng, lối sống và sức khỏe', 'Các rối loạn tâm lý', 'Trị liệu và điều trị'],
  en: ['Introduction to Psychology', 'Psychological Research', 'Biopsychology', 'States of Consciousness', 'Sensation and Perception', 'Learning', 'Thinking and Intelligence', 'Memory', 'Lifespan Development', 'Emotion and Motivation', 'Personality', 'Social Psychology', 'Industrial-Organizational Psychology', 'Stress, Lifestyle, and Health', 'Psychological Disorders', 'Therapy and Treatment']
};
export function collectPages() {
  return ['vi', 'en'].flatMap(locale => walk(path.join(sourceRoot, locale)).filter(file => file.endsWith('.md')).map(file => {
    const relative = path.relative(path.join(sourceRoot, locale), file).split(path.sep).join('/');
    const markdown = fs.readFileSync(file, 'utf8');
    return { locale, relative, route: `/${locale}/${relative.replace(/\.md$/, '')}`, title: plainTitle(markdown), chapter: relative.includes('/') ? Number(relative.slice(0, 2)) : null };
  }));
}
