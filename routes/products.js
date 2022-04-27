const express = require("express");
const handlers = require("../handlers/product");
const catchAsync = require("../utilities/catchAsync");
const { isLogin, isOwner, isToken } = require("../utilities/checkAuth");

const router = express.Router({ mergeParams: true });

router.post("/product", catchAsync(handlers.getAllProduct));
router.get("/:id/product", isToken, catchAsync(handlers.getAllMerchantProduct));
router.post("/:id/product", isToken, catchAsync(handlers.addNewProduct));
router.get(
  "/:id/product/:prodid",
  isLogin,
  isOwner,
  catchAsync(handlers.getProductByID)
);
router.patch(
  "/:id/product/:prodid",
  isToken,
  catchAsync(handlers.updateProduct)
);
router.delete(
  "/:id/product/:prodid",
  isToken,
  catchAsync(handlers.removeProduct)
);

module.exports = router;
