import * as http from 'http';
import * as debug from 'debug';
import { MongoClient } from 'mongodb';
import { MONGODB_URI } from './utils/constants';
import App from './App';

// Use debug to set up some terminal logging for the app.
debug('ts-express:server');

// Connect to the database before starting the application server.
MongoClient.connect(MONGODB_URI, (error, database) => {
  if (error) {
    console.log(error);
    process.exit(1);
  }

  // App instance
  const app = new App(database).express;

  // Get a port value from the environment, or default to 6789.
  const port = process.env.PORT || '6789';

  app.set('port', port);

  // Create an HTTP server, and pass App (our Express app) as a param.
  const server = http.createServer(app);

  // Initialize the app.
  server.listen(port);

  // Set up some basic error handling and a terminal log
  // to show us when the app is ready and listening.
  server.on('listening', () => {
    debug(`Server listening on ${server.address().port}`);
  });

  server.on('error', (error: NodeJS.ErrnoException) => {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    switch (error.code) {
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
  });
});
