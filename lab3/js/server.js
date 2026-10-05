const http = require('http');
const fs = require('fs/promises');
const path = require('path');
const maths = require('./modules/utils.js');

const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.txt');

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname.replace(/\/+$/, '') || '/';

  try {
   
    if (pathname === '/info' && req.method === 'GET') {
      const name = parsedUrl.searchParams.get('name') || 'Anonymous';
      const currentTime = maths.getDate();

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(`
        <div style="font-family: sans-serif; padding: 20px;">
          <h1 style="color: blue;">Hello, ${name}!</h1>
          <p style="color: blue;">Current Time: ${currentTime}</p>
        </div>
      `);
    }

    
if (pathname.startsWith('/read/') && req.method === 'GET') {

  const rawFileName = pathname.replace('/read/', '');
  const safeFileName = path.basename(rawFileName);

  if (!safeFileName) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Error: Please specify a file name (e.g., /read/file.txt)');
  }

  const targetPath = path.join(__dirname, safeFileName);

  try {
    const content = await fs.readFile(targetPath, 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end(content);
  } catch (err) {
    if (err.code === 'ENOENT') {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end(`Error: "${safeFileName}" not found on the server.`);
    }
    throw err;
  }
}

    
    if (pathname === '/write' && (req.method === 'GET' || req.method === 'POST')) {
      const content = parsedUrl.searchParams.get('content') || 'Default entry\n';

      
      await fs.writeFile(DATA_FILE, content, 'utf-8');

      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Successfully wrote to file!');
    }

    
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');

  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});