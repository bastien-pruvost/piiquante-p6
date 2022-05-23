const http = require('http');
const app = require('./app');

const server = http.createServer(app);

const port = process.env.PORT || 3000;
process.env.NODE_ENV = 'development';

server.listen(port, () => {
  console.log(`Environment : ${process.env.NODE_ENV}`);
  console.log(`Listening on port ${port}`);
});
