import dotenv from "dotenv";
dotenv.config();

const configuration = {
  database: {
    POSTGRES_URI: process.env.POSTGRES_URI,
    MONGODB_URI: process.env.MONGODB_URI,
  },
  server: {
    PORT: process.env.PORT,
  },
  salt: {
    BCRYPT_SALT: process.env.BCRYPT_SALT,
  },
  nodemailer: {
    NODEMAILER_PORT: process.env.NODEMAILER_PORT,
    NODEMAILER_EMAIL: process.env.NODEMAILER_EMAIL,
    NODEMAILER_PASS: process.env.NODEMAILER_PASS,
  },
  jwt: {
    ACCESS_KEY: process.env.ACCESS_KEY,
    ACCESS_TIME: process.env.ACCESS_TIME,
    REFRESH_KEY: process.env.REFRESH_KEY,
    REFRESH_TIME: process.env.REFRESH_TIME,
  },
};

export default configuration;
