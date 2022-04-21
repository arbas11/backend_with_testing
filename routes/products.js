const express = require("express");
const handlers = require("../handlers/product");
const catchAsync = require("../utilities/catchAsync");
const { isLogin, isOwner } = require("../utilities/checkAuth");

const router = express.Router({ mergeParams: true });

router.post("/product", catchAsync(handlers.getAllProduct));

router.post(
  "/:id/product",
  isLogin,
  isOwner,
  catchAsync(handlers.addNewProduct)
);
router.get(
  "/:id/product/:prodid",
  isLogin,
  isOwner,
  catchAsync(handlers.getProductByID)
);
router.patch(
  "/:id/product/:prodid",
  isLogin,
  isOwner,
  catchAsync(handlers.updateProduct)
);
router.delete(
  "/:id/product/:prodid",
  isLogin,
  isOwner,
  catchAsync(handlers.removeProduct)
);

module.exports = router;
