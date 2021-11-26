const fs = require('fs');
const http = require('http');
const connect = require('connect');
const middlewares = connect();

const createServer = async () => {
  http.createServer(middlewares).listen(3000, () => {
    console.log('Server running on port 3000');
  });
};

const indexHtmlMiddleware = (req, res, next) => {
  if (req.url === '/') {
    const htmlPath = './index.html';
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    return res.end(htmlContent);
  }
};

// 返回 html 文件的中间件
middlewares.use(indexHtmlMiddleware);

createServer();
