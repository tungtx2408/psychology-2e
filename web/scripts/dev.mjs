import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { webRoot, sourceRoot } from './content.mjs';

const prepared = spawnSync(process.execPath, [path.join(webRoot, 'scripts', 'prepare-content.mjs')], { stdio: 'inherit' });
if (prepared.status !== 0) process.exit(prepared.status || 1);
const child = spawn(process.execPath, [path.join(webRoot, 'node_modules', 'vitepress', 'bin', 'vitepress.js'), 'dev', '.generated', '--host', '127.0.0.1', '--port', '5173', '--strictPort'], { cwd: webRoot, stdio: 'inherit' });
let timer;
const watchers = ['en', 'vi', 'images'].map(dir => fs.watch(path.join(sourceRoot, dir), { recursive: true }, () => {
  clearTimeout(timer);
  timer = setTimeout(() => spawnSync(process.execPath, [path.join(webRoot, 'scripts', 'prepare-content.mjs')], { stdio: 'inherit' }), 500);
}));
function cleanup() { clearTimeout(timer); watchers.forEach(watcher => watcher.close()); child.kill(); }
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
child.on('exit', code => { cleanup(); process.exit(code || 0); });
