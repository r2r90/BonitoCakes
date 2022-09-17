const express = require('express');
const router = express.Router();

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

// !!Route for get all products
router.route('/products').get(getProducts);

// !!Route for add new product
router.route('/admin/product/new').post(newProduct);

// !!Route for get single product
router.route('/product/:id').get(getSingleProduct);

// !!Route for update product
router.route('/admin/product/:id').put(updateProduct);

// !!Route for delete product
router.route('/admin/product/:id').put(updateProduct).delete(deleteProduct);

module.exports = router;
