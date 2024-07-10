const { User } = require("../models/user");
const { ErrorHandler } = require("../utils/errorHandler");
const { getAuthPayload } = require("../utils/token");
const { CatchAsyncError } = require("./catchAsyncError");

const verifyUser = CatchAsyncError(async (req, res, next) => {
  const authToken = req.cookies.token;
  if (!authToken) {
    return next(new ErrorHandler("User not authorized", 401));
  }
  const authTokenPayload = getAuthPayload(authToken);
  
  const isUser = User.findById(authTokenPayload.id);
  
  if(!isUser) {
    return next(new ErrorHandler("User not authorized", 401));
  }

  next();
});

module.exports = {
  verifyUser,
};
