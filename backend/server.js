const http = require('http');
const app = require('./app');

// --- SETUP NODE_ENV ---
process.env.NODE_ENV = 'development';

// --- NORMALIZE PORT ---
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// --- INITIALIZE SERVER WITH EXPRESS APP ---
const server = http.createServer(app);

// --- ERROR HANDLER ---
const errorHandler = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port: ${port}`;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges.`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use.`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};
server.on('error', errorHandler);

// --- CONSOLE LOG ON SERVER LISTENING ---
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port: ${port}`;
  console.log(`Listening on  ${bind}`);
});

// --- LISTENING ---
server.listen(port);
