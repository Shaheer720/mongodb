// middleware.js

// Middleware function to log incoming requests
function logRequests(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next(); // Call the next middleware in the chain
}

module.exports = {
  logRequests
};
