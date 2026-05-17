const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isProd = process.env.NODE_ENV === "production";
  const message = statusCode === 500 ? "Internal server error" : err.message;

  if (statusCode === 500) {
    console.error(err);
  }

  if (!isProd && statusCode === 500) {
    res.status(statusCode).json({ message: err.message || message });
    return;
  }

  res.status(statusCode).json({ message });
};

module.exports = errorHandler;
