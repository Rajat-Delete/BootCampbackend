const dotenv = require('dotenv');

dotenv.config(); 

module.exports = {
    PORT : process.env.PORT,
    NODE_ENV : process.env.NODE_ENV,
    MONGO_URI : process.env.MONGO_URI,
    GEOCODER_PROVIDER : process.env.GEOCODER_PROVIDER,
    GEOCODER_API_KEY : process.env.GEOCODER_API_KEY,
    BOOTCAMP_PHOTO_SIZE: process.env.BOOTCAMP_PHOTO_SIZE,
    BOOTCAMP_PHOTO_FILE_UPLOAD_PATH : process.env.BOOTCAMP_PHOTO_FILE_UPLOAD_PATH,
    JWT_SECRET_KEY : process.env.JWT_SECRET_KEY,
    JWT_EXPIRE : process.env.JWT_EXPIRE,
    JWT_COOKIE_EXPIRE : process.env.JWT_COOKIE_EXPIRE,
}