import dotenv from "dotenv";
dotenv.config();

const configuration = {
    database: {
        POSTGRES_URI: process.env.POSTGRES_URI,
        MONGODB_URI: process.env.MONGODB_URI
    },
    server: {
        PORT: process.env.PORT
    },
    salt: {
        BCRYPT_SALT: process.env.BCRYPT_SALT
    }
};

export default configuration;