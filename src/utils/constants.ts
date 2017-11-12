const usr = process.env.MONGODB_USERNAME;
const pwd = process.env.MONGODB_PASSWORD;

export const MONGODB_URI = `mongodb://${usr}:${pwd}@ds159235.mlab.com:59235/placelog`;
export const PLACES_COLLECTION = 'places';
