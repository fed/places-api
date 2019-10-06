const DB_USERNAME = 'placelog';
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = 'ds159235.mlab.com';
const DB_PORT = 59235;

export const DB_NAME = 'placelog';
export const DB_URI = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
export const PLACES_COLLECTION = 'places';
export const DEFAULT_PORT = '8080';
