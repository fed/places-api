import {Router, Request, Response, NextFunction} from 'express';

const router = Router();

// placeholder route handler
router.get('/', (request: Request, response: Response, next: NextFunction) => {
  response.json({
    meta: {
      message: 'Success',
      status: response.statusCode
    },
    data: null
  });
});

export default router;
