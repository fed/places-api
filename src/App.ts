import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import {Db} from 'mongodb';

// Routes
import IndexRouter from './routes/IndexRouter';
import PlacesRouter from './routes/PlacesRouter';

// Creates and configures an ExpressJS web server.
export default class App {

  // Express instance.
  public express: express.Application;

  // Database instance.
  private database: Db;

  //Run configuration methods on the Express instance.
  constructor(databaseInstance) {
    this.database = databaseInstance;
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    this.express.use('/', IndexRouter);
    this.express.use('/api/v1/places', PlacesRouter(this.database.collection('places')));
  }
}
