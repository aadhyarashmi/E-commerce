const express = require("express");
const { getAllProduct,createProduct,updateProduct,deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview } = require("../controllers/productController");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");
const router= express.Router();

router.route("/products").get(getAllProduct);
router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);
router.route("/admin/product/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct);
router.route("/admin/product/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);
router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticatedUser,createProductReview);
router.route("/review").get(getProductReviews).delete(isAuthenticatedUser,deleteReview);

module.exports = router;