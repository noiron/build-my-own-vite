const fs = require('fs');
const path = require('path');
const http = require('http');
const connect = require('connect');
const { dirname } = require('path');
const middlewares = connect();

const cacheDir = path.join(__dirname, 'node_modules/.vite');

const optimizeDeps = () => {
  fs.mkdirSync(cacheDir, { recursive: true });

  const deps = Object.keys(require('../package.json').dependencies);
  console.log('deps: ', deps);
};

const createServer = async () => {
  await optimizeDeps();
  http.createServer(middlewares).listen(3000, () => {
    console.log('Server running on port 3000');
  });
};

const indexHtmlMiddleware = (req, res, next) => {
  if (req.url === '/') {
    const htmlPath = path.resolve(dirname, '../index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    return res.end(htmlContent);
  }
};

// 返回 html 文件的中间件
middlewares.use(indexHtmlMiddleware);

createServer();
