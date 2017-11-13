// const { MONGODB_USERNAME, MONGODB_PASSWORD } = process.env;

const MONGODB_USERNAME = 'placelog';
const MONGODB_PASSWORD = 'golecalp';

export const MONGODB_URI = `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@ds159235.mlab.com:59235/placelog`;
export const PLACES_COLLECTION = 'places';
