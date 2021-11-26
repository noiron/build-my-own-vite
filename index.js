const http = require('http');

const createServer = async () => {
  http.createServer().listen(3000, () => {
    console.log('Server running on port 3000');
  });
};

createServer();
