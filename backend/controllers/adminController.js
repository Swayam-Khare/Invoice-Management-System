const { db } = require("../models/connection");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");
const Admin = db.Admin;

// ------------- UPDATE ADMIN --------------

exports.updateAdmin = asyncErrorHandler(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  if (password || confirmPassword) {
    const error = new CustomError("you can not update password using this end point", 400);
    return next(error);
  }
  const admin = await Admin.findByPk(req.params.id);
  if (!admin) {
    const error = new CustomError("admin for the given id does not exist", 404);
    return next(error);
  }
  const updateAdmin = await Admin.update(
    { name, email },
    {
      where: { id: req.params.id },
      returning: true,
      plain: true,
    }
  );
  // console.log(updateAdmin[1].dataValues);
  updateAdmin[1].dataValues.password = undefined;

  res.status(200).json({
    data: {
      updatedAdmin: updateAdmin[1].dataValues,
    },
  });
});

// ============ update Admin Password================
exports.updatePassword = asyncErrorHandler(async (req, res, next) => {
  try {

    const { currentPassword, newPassword, confirmPassword } = req.body;
    const admin = req.admin;

    // Update password in the database

    // Check if current password matches

    const isPasswordValid = await admin.comparePasswordInDb(currentPassword, admin.password);

    if (!isPasswordValid) {
      const error = new CustomError("Current password is incorrect", 400);
      return next(error);
    }


    if (newPassword !== confirmPassword) {
      const error = new CustomError("New password and confirm password do not match", 400);
      return next(error);
    }


    admin.password = newPassword;
    admin.lastPasswordChange = Date.now(); // Update the timestamp of the last password change
    await admin.save();


    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
});