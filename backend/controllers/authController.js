const db = require("./../models/connection");
const asyncErrorHandler = require("./../utils/asyncErrorHandler");
const CustomError = require("./../utils/customError");
const signToken = require("../utils/signToken");
const jwt = require("jsonwebtoken");

const Vendor = db.db.Vendor;

// ===========================================SIGNUP==================================================== //

// ===========================================LOGIN==================================================== //

exports.login = asyncErrorHandler(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    const error = new CustomError(
      "Please provide email ID & Password for login in!",
      400
    );
    return next(error);
  }

  //Check if vendor exists
  const vendor = await Vendor.findOne({
    where: {
      email,
    },
  });

  //if vendor exists and password match
  if (
    !vendor ||
    !(await vendor.comparePasswordInDb(password, vendor.password))
  ) {
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
  const decodedToken = jwt.verify(
    testToken.split(" ")[1],
    process.env.SECRET_STR
  );

  // const { email, password } = req.body;

  // Find the vendor by token id
  const vendor = await Vendor.findByPk(decodedToken.id);

  if (!vendor) {
    const error = new CustomError(
      "The user with given credential does not exist.",
      401
    );
    next(error);
  }

  // Attach vendor ID to request object
  req.vendorId = decodedToken.id;

  // Compare passwords
  //   const isPasswordValid = await bcrypt.compare(password, Vendor.password);
  //   if (!isPasswordValid) {
  //     throw new CustomError("password is wrong !", 401);
  //   }

  // Check if token version or last password change timestamp matches
  //   if (decodedToken.version !== vendor.tokenVersion || decodedToken.lastPasswordChange !== vendor.lastPasswordChange) {
  //     throw new CustomError("Unauthorized - Token invalid", 401);
  //   }

  // 5. allow user to access route
  //   req.vendor = vendor;
  next();
});
