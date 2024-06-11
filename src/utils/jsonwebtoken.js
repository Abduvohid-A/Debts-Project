import jwt from "jsonwebtoken";

export const createToken = (payload, secret_key, expires) => {
  try {
    const token = jwt.sign(payload, secret_key, expires);
    
    return token;

  } catch (error) {
    console.log(error);

    return false;
  }
};
