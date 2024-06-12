import { logger } from "../utils/logger.js";

export const logMiddleware = async(req, res, next) =>{
    let struct =  `Url:${req.url} Method:${req.method} Params:${req.params}`
    logger.silly(struct)
    next()
};
