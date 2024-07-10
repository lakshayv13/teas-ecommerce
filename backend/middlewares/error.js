const { ErrorHandler } = require("../utils/errorHandler");

function errorMiddleware(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Something went wrong";

  if (err.code === 11000) {
    const message = "User already exist";
    err = new ErrorHandler(message, 400);
  }

  if(err.name === "CastError") {
    const message = "Resouce not found";
    err = new ErrorHandler(message, 404)
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
}

module.exports = {
  errorMiddleware,
};
