const ratelimiter = require("../config/upstash");


const rateLimitMiddleware = async (req, res, next) => {
  try {
    const ip = req.ip || "anonymous"
    const { success } = await ratelimiter.limit(ip);

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later",
      });
    }

    next();
  } catch (error) {
    console.log("Rate limit error", error);
    next(error);
  }
};

module.exports = rateLimitMiddleware;