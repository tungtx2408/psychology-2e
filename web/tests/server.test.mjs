import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import path from 'node:path';
import { webRoot } from '../scripts/content.mjs';

test('Bản build phục vụ URL sâu, đúng kiểu nội dung và không lộ nguồn/handoff', async () => {
  const child = spawn(process.execPath, [path.join(webRoot, 'scripts', 'serve.mjs')], { env: { ...process.env, BOOK_PORT: '4188' }, stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true });
  try {
    await Promise.race([once(child.stdout, 'data'), once(child, 'exit').then(() => { throw new Error('Server exited before ready'); })]);
    const root = await fetch('http://127.0.0.1:4188/');
    assert.equal(root.status, 200); assert.match(root.headers.get('content-type'), /text\/html/);
    assert.match(await root.text(), /Hiểu tâm trí/);
    const deep = await fetch('http://127.0.0.1:4188/vi/01-introduction-to-psychology/01-1-1-what-is-psychology');
    assert.equal(deep.status, 200); assert.match(await deep.text(), /id="term-00001"/);
    const head = await fetch('http://127.0.0.1:4188/en/00-toc', { method: 'HEAD' });
    assert.equal(head.status, 200); assert.equal(await head.text(), '');
    assert.equal((await fetch('http://127.0.0.1:4188/ai-handoff/SOURCE_BASELINE.json')).status, 404);
    assert.equal((await fetch('http://127.0.0.1:4188/TRANSLATION_GUIDE.md')).status, 404);
    assert.equal((await fetch('http://127.0.0.1:4188/', { method: 'POST' })).status, 405);
  } finally { const closed = once(child, 'exit'); child.kill(); await closed; }
});
