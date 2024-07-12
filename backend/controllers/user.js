const { CatchAsyncError } = require("../middlewares/catchAsyncError");
const { User } = require("../models/user");
const { setCookie, deleteCookie } = require("../utils/cookie");
const { ErrorHandler } = require("../utils/errorHandler");

const userController = {
  signUp: CatchAsyncError(async (req, res, next) => {
    const userPayload = req.body;

    const user = await User.create(userPayload);

    const token = user.getAuthToken();

    setCookie(res, "token", token);

    res.status(200).json({
      success: true,
      token: token,
    });
  }),

  signIn: CatchAsyncError(async (req, res, next) => {
    const userPayload = req.body;
    const user = await User.findOne({
      $or: [{ email: userPayload.user }, { mobile: userPayload.user }],
    });

    if (!user) {
      return next(new ErrorHandler("Invalid credentials", 404));
    }

    const isMatch = user.verifyPassword(userPayload.password);
    if (!isMatch) {
      return next(new ErrorHandler("Invalid credentials", 400));
    }

    const token = user.getAuthToken();

    setCookie(res, "token", token);

    res.status(200).json({
      success: true,
      token: token,
    });
  }),

  logout: CatchAsyncError(async (req, res, next) => {
    deleteCookie(res, "token");
    req.user = "";
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  }),

  fetchProfile: CatchAsyncError(async (req, res, next) => {
    const userPayload = req.user;
    res.status(200).json({
      success: true,
      user: userPayload,
    });
  }),

  updateProfile: CatchAsyncError(async (req, res, next) => {
    const updatePayload = req.query;
    const userPayload = req.user;

    const fieldName = Object.keys(updatePayload)[0];
    userPayload[fieldName] = updatePayload[fieldName];

    await userPayload.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  }),

  deleteProfile: CatchAsyncError(async (req, res, next) => {
    const userPayload = req.user;
    await User.deleteOne(userPayload);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  }),
};

module.exports = {
  userController,
};
