import { decodeToken } from "../utils/jsonwebtoken.js";

export const checkTokenUser = async (req, res, next) => {
  try {
    const [type, token] = req.headers.authorization.split(" ");

    if (type !== "Bearer") {
      return res.status(403).send("Authorization failed");
    }

    const decode = decodeToken(token);

    if (decode.role !== "user") {
      return res.status(401).send("Authorization failed");
    }

    req.user = decode;

    next();
  } catch (error) {
    console.log(error);

    res.status(404).send("Authorization failed");
  }
};

export const checkTokenAdmin = async (req, res, next) => {
  try {
    const [type, token] = req.headers.authorization.split(" ");

    if (type !== "Bearer") {
      return res.status(403).send("Authorization failed");
    }

    const decode = decodeToken(token);

    if (decode.role !== "admin") {
      return res.status(401).send("Authorization failed");
    }

    req.admin = decode;

    next();
  } catch (error) {
    console.log(error);

    res.status(404).send("Authorization failed");
  }
};
