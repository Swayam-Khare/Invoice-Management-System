const { db } = require("./../models/connection");
const asyncErrorHandler = require("./../utils/asyncErrorHandler");
const CustomError = require("./../utils/customError");
const signToken = require("../utils/signToken");
const jwt = require("jsonwebtoken");
const util = require("util");
const sendEmail = require("../utils/email");

const Vendor = db.Vendor;
const Admin = db.Admin;

// ------------------LOGIN------------------ //
const crypto = require("crypto");
const { Op } = require("sequelize");

// ===========================================SIGNUP==================================================== //

//  moved to vendor controller

// ===========================================LOGIN==================================================== //

exports.login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const role = req.params.role;
  let token;

  if (!email || !password) {
    return next(
      CustomError("Please provide email ID & Password for login in!", 400)
    );
  }

  if (role === "admin") {
    //Check if admin exists
    const admin = await Admin.findOne({
      where: {
        email,
      },
    });

    //Check if password matches
    const isMatch = await admin.comparePasswordInDb(password, admin.password);

    if (!admin || !isMatch) {
      return next(new CustomError("Incorrect email or password!", 400));
    }

    token = signToken(admin.id, role);
  } else if (role === "vendor") {
    //Check if vendor exists
    const vendor = await Vendor.findOne({
      where: {
        email,
      },
    });

    //Check if password matches
    const isMatch = await vendor.comparePasswordInDb(password, vendor.password);

    if (!vendor || !isMatch) {
      return next(new CustomError("Incorrect email or password!", 400));
    }

    token = signToken(vendor.id, role);
  } else {
    return next(new CustomError("Page not Found!", 404));
  }

  res.cookie("jwt", token, {
    maxAge: process.env.LOGIN_EXPIRES,
    // secure:true,
    httpOnly: true,
  });

  res.status(200).json({
    status: "Success",
    token,
  });
});

exports.protect = asyncErrorHandler(async (req, res, next) => {
  // 1. Read the token and check if it exists
  const testToken = req.headers.authorization;
  let token;

  if (testToken && testToken.startsWith("Bearer ")) {
    token = testToken.split(" ")[1];
  }
  if (!token) {
    next(new CustomError("You are not logged in!", 401));
  }

  // 2. Validate the token
  const decodedToken = await util.promisify(jwt.verify)(
    token,
    process.env.SECRET_STR
  );

  if (decodedToken.role === "vendor") {
    // 3. Check if the vendor exists
    const vendor = await Vendor.findByPk(decodedToken.id);

    if (!vendor) {
      const error = new CustomError(
        "Vendor with the given credential does not exist!",
        401
      );
      return next(error);
    }

    // 4.Check if the vendor changed the password after the token was issued
    
    if (await vendor.isPasswordChanged(decodedToken.iat)) {
      
      const err =  new CustomError(
          "Password has been changed recently. Please login again!",
          401
        );
      return next(err);
    }

    // 5. Attach vendor details to request object
    req.vendor = vendor;
  } else if (decodedToken.role === "admin") {
    // 3. Check if the admin exists
    const admin = await Admin.findByPk(decodedToken.id);

    if (!admin) {
      const error = new CustomError(
        "Admin with the given credential does not exist!",
        401
      );
      return next(error);
    }

    // 4. Check if the admin changed the password after the token was issued
    if (await admin.isPasswordChanged(decodedToken.iat)) {
      const err =  new CustomError(
        "Password has been changed recently. Please login again!",
        401
      );
      return next(err);
    }

    // 5. Attach admin details to request object
    req.admin = admin;
  }

  req.role = decodedToken.role;
  next();
});

exports.forgotPassword = asyncErrorHandler(async (req, res, next) => {
  // 1. GET VENDOR BASED ON POSTED EMAIL
  const vendor = await Vendor.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!vendor) {
    return next(
      new CustomError("Vendor with the given credential does not exist!", 401)
    );
  }

  // 2. GENERATE A RANDOM RESET TOKEN
  const resetToken = await vendor.createResetPasswordToken();

  await vendor.save({ validateBeforeSave: false });

  // 3. SEND THE TOKEN BACK TO VENDOR'S EMAIL
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetPassword/${resetToken}`;
  const message = `We have recieved a password reset request. Please use below link to reset your password.\n\n${resetUrl}\n\nThis reset password link will expire in 10 minutes`;

  try {
    await sendEmail({
      email: vendor.email,
      subject: "Password change request recieved",
      message: message,
    });

    res.status(200).json({
      status: "Success",
      message: "Password reset link has been sent to vendor's email",
    });
  } catch (err) {
    vendor.passwordResetToken = undefined;
    vendor.passwordResetTokenExpires = undefined;
    vendor.save({ validateBeforeSave: false });

    return next(
      new CustomError(
        "There was an error sending password reset email. Please try again later!",
        500
      )
    );
  }
});

exports.resetPassword = asyncErrorHandler(async (req, res, next) => {
  const token = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const vendor = await Vendor.findOne({
    where: {
      passwordResetToken: token,
      passwordResetTokenExpires: { [Op.gt]: Date.now() },
    },
  });

  if (!vendor) {
    return next(new CustomError("Token is invalid or has expired!", 400));
  }

  // Reseting the vendor password details
  vendor.password = req.body.password;
  vendor.confirmPassword = req.body.confirmPassword;
  vendor.passwordResetToken = null;
  vendor.passwordResetTokenExpires = null;
  vendor.passwordChangedAt = Date.now();

  await vendor.save();

  // login the user
  const loginToken = signToken(vendor.id);

  res.cookie("jwt", loginToken, {
    maxAge: process.env.LOGIN_EXPIRES,
    // secure:true,
    httpOnly: true,
  });

  res.status(200).json({
    status: "Success",
    token: loginToken,
  });
});

exports.restrict = (role) => {
  return (req, res, next) => {
    if (req.role !== role) {
      return next(
        new CustomError(
          "You do not have permission to perform this action",
          403
        )
      );
    }
    next();
  };
};
