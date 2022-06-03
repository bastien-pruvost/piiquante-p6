const { RateLimiter } = require('limiter');

// Initialize the request limiter to 2 requests every 2 seconds
const loginRateLimiter = new RateLimiter({
  tokensPerInterval: 2,
  interval: 10000,
  fireImmediately: true,
});

// Middleware to send an error when the user exceeds the number of login requests
exports.loginLimiter = async (req, res, next) => {
  try {
    const remainingRequests = await loginRateLimiter.removeTokens(1);
    if (remainingRequests < 0) {
      res.status(429).json({ message: 'Veuillez attendre quelques secondes avant de réessayer' });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
