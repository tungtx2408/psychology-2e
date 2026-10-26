import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { webRoot } from './content.mjs';
const root = path.join(webRoot, 'dist');
const port = Number(process.env.BOOK_PORT || 4173);
if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error('BOOK_PORT phải nằm trong khoảng 1024–65535.');
if (!fs.existsSync(path.join(root, 'index.html'))) throw new Error('Chưa có bản web. Hãy chạy build trước.');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.ico': 'image/x-icon' };
const server = http.createServer((req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
  let name;
  try { name = decodeURIComponent(new URL(req.url, `http://127.0.0.1:${port}`).pathname); } catch { res.writeHead(400); res.end(); return; }
  let file = path.resolve(root, '.' + name);
  if (!file.startsWith(root + path.sep) && file !== root) { res.writeHead(403); res.end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file) && fs.existsSync(file + '.html')) file += '.html';
  let status = 200;
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) { status = 404; file = path.join(root, '404.html'); }
  if (!fs.existsSync(file)) { res.writeHead(404); res.end('Không tìm thấy trang.'); return; }
  res.writeHead(status, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Content-Length': fs.statSync(file).size, 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' });
  if (req.method === 'HEAD') res.end(); else fs.createReadStream(file).pipe(res);
});
server.on('error', error => { console.error(error.code === 'EADDRINUSE' ? `Cổng ${port} đang được sử dụng. Đóng phiên đọc cũ hoặc đặt BOOK_PORT khác.` : error.message); process.exitCode = 1; });
server.listen(port, '127.0.0.1', () => {
  const url = `http://127.0.0.1:${port}/`;
  console.log(`Sách đang mở tại ${url}\nNhấn Ctrl+C để dừng.`);
  if (process.argv.includes('--open') && !process.env.BOOK_NO_OPEN && process.platform === 'win32') {
    const child = spawn('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', `Start-Process '${url}'`], { windowsHide: true, stdio: 'ignore' });
    child.on('error', () => console.log(`Mở trình duyệt và truy cập ${url}`)); child.unref();
  }
});
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => process.exit(0)));
