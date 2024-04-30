const { db } = require("../models/connection");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");
const Admin = db.Admin;
const Vendor = db.Vendor;
const connectDB = db.connectDB;
const randomstring = require("randomstring");
const sendEmail = require("../utils/email");

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
      const error = new CustomError("New password and confirm password does not match", 400);
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

// =============================== Approve vendor =======================

exports.approveVendor = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;
  const vendor = await Vendor.findByPk(id);
  if (!id || !vendor) {
    if (!id) {
      const error = new CustomError("please give id in parameters", 400);
      return next(error);
    }
    if (!vendor) {
      const error = new CustomError("Vendor for the given id does not exist", 404);
      return next(error);
    }
  }

  if (vendor.status === "approved") {
    const err = new CustomError("Vendor has been already approved", 400);
    return next(err);
  }
  try {
    const result = await connectDB.transaction(async (t) => {
      const password = randomstring.generate(12);

      const [rows, updatedVendor] = await Vendor.update(
        { status: 'approved', password },

        {
          where: { id },
          returning: true,
          individualHooks: true,
          // plain: true,
          transaction: t
        })

      if (rows) {
        const message = `Hello ${vendor.firstName}! , Your request for using our application has been approved. You can login with the following credentials \n\n\n\n Email : ${vendor.email} \n Password : ${password} `


        await sendEmail({
          email: vendor.email,
          subject: "Approval of vendor",
          message: message,
        });
      }
      else {
        const err = new CustomError('User not found!', 404);
        next(err);
      }
    })
  } catch (err) {
    return res.status(400).json({
      status: "Fail",
      message: err.message
    })
  }
  res.status(200).json({
    status: "Success",
    message: "Vendor has been Approved",
  });
});

exports.sendMail = asyncErrorHandler(async (req, res, next) => {
  let { firstName, lastName, contact, email, message } = req.body;
  if (!email || !message || !firstName || !contact) {
    const error = new CustomError("Please provide all the required details", 400);
    return next(error);
  }
  try {

    message = `From: ${email}\nContact no.: ${contact}\n\n${message}`

    await sendEmail({
      email: "admin@gmail.com",
      subject: `Message from ${firstName} ${lastName}`,
      message,
    });
    res.status(200).json({
      status: "Success",
      message: "Email has been sent successfully",
    });
  } catch (err) {
    return res.status(400).json({
      status: "Fail",
      message: err.message
    })
  }
});