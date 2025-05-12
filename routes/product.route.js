const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controlles/product.control');
const { protect, authorize } = require('../middleware/auth.middleware');

// All routes require authentication
router.get('/', protect, getProducts);
router.get('/:id', protect, getProductById);
router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, authorize('admin'), deleteProduct);

module.exports = router;