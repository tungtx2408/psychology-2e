import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { sourceRoot, walk } from './content.mjs';
export function verifySource() {
  const baseline = JSON.parse(fs.readFileSync(path.join(sourceRoot, 'ai-handoff', 'SOURCE_BASELINE.json'), 'utf8'));
  const failures = [];
  const expected = new Set(baseline.files.map(file => file.path));
  const current = ['TRANSLATION_GUIDE.md', ...['en', 'vi', 'images'].flatMap(dir => walk(path.join(sourceRoot, dir)).map(file => path.relative(sourceRoot, file).split(path.sep).join('/')))];
  for (const file of baseline.files) {
    const target = path.join(sourceRoot, file.path);
    if (!fs.existsSync(target)) { failures.push(`Missing source: ${file.path}`); continue; }
    const hash = crypto.createHash('sha256').update(fs.readFileSync(target)).digest('hex');
    if (hash !== file.sha256) failures.push(`Changed source: ${file.path}`);
  }
  for (const file of current) if (!expected.has(file)) failures.push(`Unrecorded source: ${file}`);
  if (failures.length) throw new Error(failures.join('\n'));
  return baseline.files.length;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) console.log(`Nguồn giữ nguyên: ${verifySource()} tệp.`);
