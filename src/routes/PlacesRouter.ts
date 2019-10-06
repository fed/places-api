import { Router, Request, Response, NextFunction } from 'express';
import { Collection, ObjectID } from 'mongodb';

export default function PlacesRouter(collection: Collection) {
    const router = Router();

    router.get('/', (request: Request, response: Response) => {
        collection.find().toArray(function(error, documents) {
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

    router.get('/:placeId', (request: Request, response: Response) => {
        const placeId = new ObjectID(request.params.placeId);

        collection
            .find({
                _id: placeId
            })
            .toArray(function(error, places) {
                if (error) {
                    throw error;
                }

                response.json({
                    meta: {
                        message: 'Success',
                        status: response.statusCode
                    },
                    data:
                        places.length === 1
                            ? places[0]
                            : places.length > 1
                            ? places
                            : null
                });
            });
    });

    router.post('/', (request: Request, response: Response) => {
        const places = request.body;

        collection.insert(places);

        collection.find().toArray((error, places) => {
            if (error) {
                throw error;
            }

            response.json({
                meta: {
                    message: 'Place(s) got added successfully',
                    status: response.statusCode
                },
                data: {
                    places
                }
            });
        });
    });

    router.delete('/:placeId', (request: Request, response: Response) => {
        const placeId = new ObjectID(request.params.placeId);

        collection.deleteOne({
            _id: placeId
        });

        collection.find().toArray((error, places) => {
            if (error) {
                throw error;
            }

            response.json({
                meta: {
                    message: 'Place successfully removed',
                    status: response.statusCode
                },
                data: {
                    places
                }
            });
        });
    });

    router.put('/:placeId', (request: Request, response: Response) => {
        const placeId = new ObjectID(request.params.placeId);
        const placeDetails = request.body;

        collection.update(
            { _id: placeId },
            { $set: placeDetails },
            (error, places) => {
                if (error) {
                    throw error;
                }

                response.json({
                    meta: {
                        message: 'Place updated successfully',
                        status: response.statusCode
                    },
                    data: {
                        places
                    }
                });
            }
        );
    });

    return router;
}
