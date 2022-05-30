const { RateLimiter } = require('limiter');

const limiter = new RateLimiter({
  tokensPerInterval: 2,
  interval: 2000,
  fireImmediately: true,
});

exports.rateLimiter = async (req, res, next) => {
  // Immediately send 429 header to client when rate limiting is in effect
  const remainingRequests = await limiter.removeTokens(1);
  if (remainingRequests < 0) {
    res.status(429).json({ message: 'Vous avez dépassé la limite de requêtes' });
  } else {
    next();
  }
};
