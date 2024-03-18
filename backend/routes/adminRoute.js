const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
router.route("/:id").patch(adminController.updateAdmin);

module.exports = router;
