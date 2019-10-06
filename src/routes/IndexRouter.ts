import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (request: Request, response: Response) => {
    response.json({
        meta: {
            message: 'Success',
            status: response.statusCode
        },
        data: null
    });
});

export default router;
