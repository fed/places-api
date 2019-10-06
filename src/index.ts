import * as http from 'http';
import { MongoClient } from 'mongodb';
import { DB_URI, DB_NAME, DEFAULT_PORT } from './utils/constants';
import App from './App';

// Mongoose settings.
const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// Connect to the database before starting the application server.
MongoClient.connect(DB_URI, config, (error, client) => {
    if (error) {
        console.log(error);
        process.exit(1);
    }

    const database = client.db(DB_NAME);

    // App instance.
    const app = new App(database).express;

    // Get a port value from the environment, or use the default.
    // Make sure the default value is a string.
    const port = process.env.PORT || DEFAULT_PORT;

    app.set('port', port);

    // Create an HTTP server, and pass App (our Express app) as a param.
    const server = http.createServer(app);

    // Initialize the app.
    server.listen(port);

    // Set up some basic error handling.
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
