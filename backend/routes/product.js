const express = require('express');
const router = express.Router();

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

// !!Route for get all products
router.route('/products').get(isAuthenticatedUser,  getProducts);
// !!Route for get single product
router.route('/product/:id').get(getSingleProduct);

// **************** Admin Routes *********************************************

// !!Route for add new product
router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles('admin'), newProduct);

// !!Route for update or delete product
router
  .route('/admin/product/:id')
  .put(isAuthenticatedUser,authorizeRoles('admin'), updateProduct)
  .delete(isAuthenticatedUser,authorizeRoles('admin'), deleteProduct);

module.exports = router;
