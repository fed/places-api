import { Router, Request, Response, NextFunction } from 'express';
const places = require('../data');

export default function PlacesRouter(collection) {
  const router = Router();

  router.get('/', (request: Request, response: Response) => {
    collection
      .find()
      .toArray(function (error, documents) {
        if (error) {
          throw error;
        }

        response.json({
          meta: {
            message: 'Success',
            status: response.statusCode
          },
          data: {
            places: documents
          }
        });
      });
  });

  router.post('/', (request: Request, response: Response) => {
    collection.insert(places);

    collection
      .find()
      .toArray(function (error, places) {
        if (error) {
          throw error;
        }

        response.json({
          meta: {
            message: 'Place got added successfully',
            status: response.statusCode
          },
          data: {
            places
          }
        });
      });
  });

  return router;
}
