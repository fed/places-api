import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

// Routes
import IndexRouter from './routes/IndexRouter';
import HeroRouter from './routes/HeroRouter';

// Creates and configures an ExpressJS web server.
class App {

  // Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
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
    this.express.use('/api/v1/heroes', HeroRouter);
  }
}

export default new App().express;
