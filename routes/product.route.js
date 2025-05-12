const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controlles/product.control');
const { protect, authorize } = require('../middleware/auth.middleware');
const { upload, handleUploadErrors } = require('../middleware/upload.middleware');

// All routes require authentication
router.get('/', getProducts);
router.get('/:id', protect, getProductById);

// Create product with image upload
router.post('/',
  protect,
  upload.single('image'), // 'image' is the field name in form data
  handleUploadErrors,
  createProduct
);

// Update product with image upload
router.put('/:id',
  protect,
  upload.single('image'),
  handleUploadErrors,
  updateProduct
);

// Delete product (admin only)
router.delete('/:id', protect, authorize('admin'), deleteProduct);

module.exports = router;