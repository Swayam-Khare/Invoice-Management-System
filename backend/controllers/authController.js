const db = require("./../models/connection");
const asyncErrorHandler = require("./../utils/asyncErrorHandler");
const CustomError = require("./../utils/customError");
const signToken = require("../utils/signToken");
const jwt = require("jsonwebtoken");
const util = require("util");
const sendEmail = require("../utils/email");
const crypto = require("crypto");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const Vendor = db.db.Vendor;

// ===========================================SIGNUP==================================================== //

//  moved to vendor controller

// ===========================================LOGIN==================================================== //

exports.login = asyncErrorHandler(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    const error = new CustomError("Please provide email ID & Password for login in!", 400);
    return next(error);
  }

  //Check if vendor exists
  const vendor = await Vendor.findOne({
    where: {
      email,
    },
  });
  vendor.reload();
  vendor.save();

  //if vendor exists and password match

  if (!vendor || !(await vendor.comparePasswordInDb(password, vendor.password))) {
    const error = new CustomError("Incorrect email or password", 400);
    return next(error);
  }
  const token = signToken(vendor.id);

  res.status(200).json({
    status: "success",
    token,
    vendor,
  });
});

exports.protect = asyncErrorHandler(async (req, res, next) => {
  // 1. read the token and if it exist then it is logedin
  const testToken = req.headers.authorization;

  // Check if token is provided
  if (!testToken || !testToken.startsWith("Bearer ")) {
    throw new CustomError("Unauthorized - Token not provided", 401);
  }

  // Verify the token
  const verifyToken = util.promisify(jwt.verify);

  const decodedToken = await verifyToken(testToken.split(" ")[1], process.env.SECRET_STR);
  console.log(decodedToken);

  // Find the vendor by token id
  const vendor = await Vendor.findByPk(decodedToken.id, { attributes: { exclude: ["password"] } });

  if (!vendor) {
    const error = new CustomError("The user with given credential does not exist.", 401);
    next(error);
  }

  // if user changed password after token is issued
  await vendor.reload();

  if (vendor.lastPasswordChange && new Date(decodedToken.iat * 1000) < vendor.lastPasswordChange) {
    throw new CustomError("Unauthorized - Password changed after token issuance", 401);
  }

  // Attach vendor ID to request object
  req.vendor = vendor;

  // Check if token version or last password change timestamp matches
  //   if (decodedToken.version !== vendor.tokenVersion || decodedToken.lastPasswordChange !== vendor.lastPasswordChange) {
  //     throw new CustomError("Unauthorized - Token invalid", 401);
  //   }

  // 5. allow user to access route
  //   req.vendor = vendor;
  next();
});

exports.forgotPassword = asyncErrorHandler(async (req, res, next) => {
  // 1. GET USED BASED ON POSTED EMAIL
  const email = req.body.email;

  const vendor = await Vendor.findOne({
    where: {
      email,
    },
  });
  if (!vendor) {
    const error = new CustomError("The vendor with given credential does not exist.", 401);
    next(error);
  }

  // 2. GENERATE A RANDOM RESET TOKEN
  const resetToken = await vendor.createResetPasswordToken();

  await vendor.save({ validateBeforeSave: false });
  console.log(resetToken);

  // 3. SEND THE TOKEN BACK TO USER EMAIL
  const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/auth/resetPassword/${resetToken}`;
  const message = `we have reacived a password reset request. please use below link to reset your password.\n\n${resetUrl}\n\nThis reset password link will exoire in 10 minutes`;

  try {
    await sendEmail({
      email: vendor.email,
      subject: "password change request recieved",
      message: message,
    });

    res.status(200).json({
      status: "success",
      message: "password reset link has been send to user email",
    });
  } catch (err) {
    vendor.passwordResetToken = undefined;
    vendor.passwordResetTokenExpires = undefined;
    vendor.save({ validateBeforeSave: false });

    return next(new CustomError("there was an error sending password reset email. please try again later.", 500));
  }
});

exports.resetPassword = asyncErrorHandler(async (req, res, next) => {
  const token = crypto.createHash("sha256").update(req.params.token).digest("hex");
  const vendor = await Vendor.findOne({ where: { passwordResetToken: token, passwordResetTokenExpires: { [Op.gt]: Date.now() } } });

  if (!vendor) {
    const error = new CustomError("Token is invalid or has expired", 400);
    next(error);
  }
  // reseting the user password

  vendor.password = req.body.password;
  vendor.confirmPassword = req.body.confirmPassword;
  vendor.passwordResetToken = null;
  vendor.passwordResetTokenExpires = null;
  vendor.lastPasswordChange = Date.now();

  await vendor.save();
  console.log(vendor);

  // login the user

  const loginToken = signToken(vendor.id);
  res.status(200).json({
    status: "success",
    token: loginToken,
  });
});
