const { CatchAsyncError } = require("../middlewares/catchAsyncError");
const { User } = require("../models/user");
const { setCookie, deleteCookie } = require("../utils/cookie");
const { ErrorHandler } = require("../utils/errorHandler");
const { getAuthPayload } = require("../utils/token");
const { UserParser } = require("../utils/types");

const userController = {
  signUp: CatchAsyncError(async (req, res, next) => {
    const userPayload = req.body;
    const parsedPayload = UserParser.safeParse(userPayload);

    if (!parsedPayload.success) {
      const errors = parsedPayload.error.errors.map((error) => error.message);
      return next(new ErrorHandler(errors.join(", "), 400));
    }

    const user = await User.create(userPayload);
    await user.save();

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

  fetchProfile: CatchAsyncError(async (req, res, next) => {
    res.json("IN function");
  }),

  logout: CatchAsyncError(async (req, res, next) => {
    deleteCookie(res, "token");
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  }),
};

module.exports = {
  userController,
};
