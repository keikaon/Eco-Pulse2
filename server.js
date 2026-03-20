/**
 * EcoPulse - Local dev server
 * Proxies NewsData.io API to keep the API key server-side.
 * Run: node server.js
 * Set NEWSDATA_API_KEY in .env
 */
require('dotenv').config();
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.NEWSDATA_API_KEY;

if (!API_KEY) {
  console.warn('⚠ NEWSDATA_API_KEY not set. Copy .env.example to .env and add your key.');
}

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
};

const server = http.createServer(async (req, res) => {
  const isNewsApi = (req.url === '/api/news' || req.url === '/.netlify/functions/get-news') && req.method === 'GET';
  if (isNewsApi) {
    if (!API_KEY) {
      res.writeHead(503, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'API key not configured', results: [] }));
      return;
    }

    try {
      const url = `https://newsdata.io/api/1/news?apikey=${encodeURIComponent(API_KEY)}&category=environment&language=tr,en,fr,de`;
      const apiRes = await fetch(url);

      if (!apiRes.ok) {
        throw new Error(`NewsData API: ${apiRes.status}`);
      }

      const data = await apiRes.json();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    } catch (err) {
      console.error('News API error:', err.message);
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'News service unavailable', results: [] }));
    }
    return;
  }

  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, filePath);
  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('Not found');
      } else {
        res.writeHead(500);
        res.end('Server error');
      }
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`EcoPulse running at http://localhost:${PORT}`);
});
