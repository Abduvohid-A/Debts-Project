import jwt from "jsonwebtoken";
import configuration from "../config/configuration.js";

export const createToken = (payload, secret_key, expires) => {
  try {
    const token = jwt.sign(payload, secret_key, expires);

    return token;
  } catch (error) {
    console.log(error);

    return false;
  }
};

export const decodeToken = (token) => {
  try {
    const { ACCESS_KEY } = configuration.jwt;

    const decode = jwt.verify(token, ACCESS_KEY);

    return decode;
  } catch (error) {
    console.log(error);

    return false;
  }
};
