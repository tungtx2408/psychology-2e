import fs from 'node:fs';
import path from 'node:path';
import { webRoot, sourceRoot, walk } from './content.mjs';
import { verifySource } from './verify-source.mjs';
const root = path.join(webRoot, 'dist');
if (!fs.existsSync(root)) throw new Error('Chưa có bản build. Hãy chạy build trước.');
const base = process.env.BOOK_BASE || '/';
const manifest = JSON.parse(fs.readFileSync(path.join(webRoot, '.generated', 'book-manifest.json'), 'utf8'));
const failures = [], cache = new Map();
const decode = text => text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
function targetFile(url, file) {
  let pathname = decodeURIComponent(url.split('?')[0]);
  if (base !== '/' && pathname.startsWith(base)) pathname = '/' + pathname.slice(base.length);
  let target = pathname.startsWith('/') ? path.join(root, pathname.slice(1)) : pathname ? path.resolve(path.dirname(file), pathname) : file;
  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, 'index.html');
  else if (!fs.existsSync(target) && fs.existsSync(target + '.html')) target += '.html';
  return target;
}
let internalLinks = 0;
for (const file of walk(root).filter(file => file.endsWith('.html'))) {
  const html = fs.readFileSync(file, 'utf8');
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const url = decode(match[1]);
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(url)) continue;
    const [relative, fragment] = url.split('#');
    const target = targetFile(relative, file);
    if (!target.startsWith(root + path.sep)) { failures.push(`Path escapes output: ${url}`); continue; }
    if (!fs.existsSync(target)) { failures.push(`${path.relative(root, file)} -> ${url}`); continue; }
    internalLinks++;
    if (fragment && target.endsWith('.html')) {
      if (!cache.has(target)) cache.set(target, new Set([...fs.readFileSync(target, 'utf8').matchAll(/\bid="([^"]+)"/g)].map(m => decode(m[1]))));
      if (!cache.get(target).has(decodeURIComponent(fragment))) failures.push(`Missing anchor: ${path.relative(root, file)} -> ${url}`);
    }
  }
}
for (const page of manifest.pages) {
  const file = path.join(root, page.route.slice(1) + '.html');
  if (!fs.existsSync(file)) { failures.push(`Missing book page: ${page.route}`); continue; }
  if (page.generated) continue;
  const source = fs.readFileSync(path.join(sourceRoot, page.locale, page.relative), 'utf8');
  const output = fs.readFileSync(file, 'utf8');
  for (const match of source.matchAll(/<a\s+id="([^"]+)"[^>]*>/g)) if (!output.includes(`id="${match[1]}"`)) failures.push(`Lost source anchor: ${page.route}#${match[1]}`);
  const calloutCount = [...source.matchAll(/^>\s*\[![^\]]+\]/gm)].length;
  if ([...output.matchAll(/<aside[^>]*data-callout=/g)].length !== calloutCount) failures.push(`Callout mismatch: ${page.route}`);
}
const sourceFiles = verifySource();
if (failures.length) throw new Error(failures.slice(0, 30).join('\n') + `\nTotal failures: ${failures.length}`);
console.log(JSON.stringify({ result: 'PASS', bookPages: manifest.pages.length, imageFiles: walk(path.join(root, 'images')).length, internalReferencesChecked: internalLinks, unchangedSourceFiles: sourceFiles }, null, 2));
