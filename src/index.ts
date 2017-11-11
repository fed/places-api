import * as http from 'http';
import * as debug from 'debug';
import App from './App';

// Use debug to set up some terminal logging for the app.
debug('ts-express:server');

// Set up some basic error handling and a terminal log
// to show us when the app is ready and listening.
function normalizePort(value: number | string): number | string | boolean {
  const port: number = typeof value === 'string' ? parseInt(value, 10) : value;

  if (isNaN(port)) {
    return value;
  } else if (port >= 0) {
    return port;
  } else {
    return false;
  }
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;

  switch(error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;

    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;

    default:
      throw error;
  }
}

function onListening(): void {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;

  debug(`Listening on ${bind}`);
}

// Get a port value from the environment, or default to 6789.
const port = normalizePort(process.env.PORT || 6789);

App.set('port', port);

// Create an HTTP server, and pass App (our Express app) as a param.
const server = http.createServer(App);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
