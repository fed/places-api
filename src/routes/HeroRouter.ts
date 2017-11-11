import {Router, Request, Response, NextFunction} from 'express';
const Heroes = require('../data');

export class HeroRouter {
  router: Router

  /**
   * Initialize the HeroRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all Heroes.
   */
  public getAll(request: Request, response: Response, next: NextFunction) {
    response
      .status(200)
      .send({
        meta: {
          message: 'Success',
          status: response.statusCode,
        },
        data: {
          heroes: Heroes
        }
      });
  }

  /**
   * GET one hero by id
   */
  public getOne(request: Request, response: Response, next: NextFunction) {
    const query = parseInt(request.params.id);
    const hero = Heroes.find(hero => hero.id === query);

    if (hero) {
      response
        .status(200)
        .send({
          meta: {
            message: 'Success',
            status: response.statusCode,
          },
          data: {
            hero
          }
        });
    }
    else {
      response
        .status(404)
        .send({
          meta: {
            message: 'No hero found with the given id.',
            status: response.statusCode
          },
          data: null
        });
    }
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/', this.getAll);
    this.router.get('/:id', this.getOne);
  }

}

// Create the HeroRouter, and export its configured Express.Router
const heroRoutes = new HeroRouter();

heroRoutes.init();

export default heroRoutes.router;
