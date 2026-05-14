const http = require('http');
const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', 'build');
const port = process.env.PORT || 5000;

const mime = (ext) => {
  const M = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  };
  return M[ext.toLowerCase()] || 'application/octet-stream';
}

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';

  const filePath = path.join(buildDir, reqPath);

  fs.stat(filePath, (err, stat) => {
    if (!err && stat.isFile()) {
      const ext = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': mime(ext) });
      fs.createReadStream(filePath).pipe(res);
      return;
    }

    // SPA fallback: serve index.html
    const indexPath = path.join(buildDir, 'index.html');
    fs.readFile(indexPath, (err2, data) => {
      if (err2) {
        res.writeHead(500);
        res.end('index.html not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  });
});

server.listen(port, () => {
  console.log(`Serving build/ at http://localhost:${port}`);
});
