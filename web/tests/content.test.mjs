import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import MarkdownIt from 'markdown-it';
import { obsidianCallouts } from '../scripts/callouts.mjs';
import { adaptImages, collectPages, sourceRoot, walk } from '../scripts/content.mjs';
import { verifySource } from '../scripts/verify-source.mjs';

const renderer = new MarkdownIt({ html: true }).use(obsidianCallouts);
test('725 tệp nguồn vẫn khớp SHA-256 của baseline', () => assert.equal(verifySource(), 725));
test('Mọi trang nguồn có route duy nhất, có đủ cả hai ngôn ngữ', () => {
  const pages = collectPages();
  assert.equal(pages.filter(p => p.locale === 'vi').length, 188);
  assert.equal(pages.filter(p => p.locale === 'en').length, 187);
  assert.equal(new Set(pages.map(p => p.route)).size, pages.length);
});
test('Chuyển ảnh nhiều dòng mà không sửa anchor, caption hay đường dẫn văn bản', () => {
  const input = '<a id="term-00001"></a>**Tâm lý học**\n\n> ![Dòng một\n> Dòng hai](../../images/example.jpg)\n\nCaption ../../images/example.jpg';
  const result = adaptImages(input);
  assert.equal(result, input.replace('](../../images/example.jpg)', '](/images/example.jpg)'));
});
test('Bảo toàn toàn bộ 352 vị trí ảnh và 2.079 anchor cho từng ngôn ngữ', () => {
  for (const locale of ['vi', 'en']) {
    let imageCount = 0, anchorCount = 0;
    for (const file of walk(path.join(sourceRoot, locale)).filter(f => f.endsWith('.md'))) {
      const source = fs.readFileSync(file, 'utf8'), adapted = adaptImages(source);
      const imagePaths = text => [...text.matchAll(/!\[[\s\S]*?\]\(([^)]+)\)/g)].map(m => m[1]);
      const ids = text => [...text.matchAll(/<a\s+id="([^"]+)"[^>]*>/g)].map(m => m[1]);
      assert.deepEqual(ids(source), ids(adapted));
      assert.deepEqual(imagePaths(source).map(p => p.split('/').at(-1)), imagePaths(adapted).map(p => p.split('/').at(-1)));
      imageCount += imagePaths(adapted).length; anchorCount += ids(adapted).length;
    }
    assert.equal(imageCount, 352); assert.equal(anchorCount, 2079);
  }
});
test('Render đủ 267 callout từ nội dung thực của mỗi ngôn ngữ', () => {
  for (const locale of ['vi', 'en']) {
    let count = 0;
    for (const file of walk(path.join(sourceRoot, locale)).filter(f => f.endsWith('.md'))) {
      const source = fs.readFileSync(file, 'utf8');
      const expected = [...source.matchAll(/^>\s*\[![^\]]+\]/gm)].length;
      const html = renderer.render(source);
      assert.equal([...html.matchAll(/<aside[^>]*data-callout=/g)].length, expected, file);
      assert.ok(!/>\[!(info|tip|note|abstract|example|question)\]/.test(html), file);
      count += expected;
    }
    assert.equal(count, 267);
  }
});
test('Callout lồng nhau, tiêu đề riêng, nội dung cùng đoạn và blockquote thường', () => {
  const html = renderer.render('> [!info] Mục tiêu\n> Dòng nội dung\n>\n> > [!tip]\n> >\n> > Gợi ý\n\n> Trích dẫn thường');
  assert.equal([...html.matchAll(/<aside /g)].length, 2);
  assert.equal([...html.matchAll(/<\/aside>/g)].length, 2);
  assert.ok(html.includes('Mục tiêu')); assert.ok(html.includes('Dòng nội dung'));
  assert.ok(html.includes('<blockquote>\n<p>Trích dẫn thường</p>'));
});
