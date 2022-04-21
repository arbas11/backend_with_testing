const express = require("express");
const catchAsync = require("../utilities/catchAsync");
const handlers = require("../handlers/merchant");
const { isToken } = require("../utilities/checkAuth");

const router = express.Router();

router.get("/register", handlers.registerInstruction);
router.post("/register", catchAsync(handlers.registerMerchant));
router.get("/:id", isToken, catchAsync(handlers.getMerchantByid));
router.delete("/:id", isToken, catchAsync(handlers.removeMerchant));

module.exports = router;
