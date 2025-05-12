const Product = require('../modules/product.module');
const fs = require('fs');
const path = require('path');
const { uploadImage } = require('../modules/imgbb.module');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Find product to update
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Handle image update
    if (req.file) {
      // Upload to ImgBB first
      try {
        const imgbbResult = await uploadImage(req.file.path);

        // Add new ImgBB image details
        req.body.imgbbImage = imgbbResult;
      } catch (imgbbError) {
        console.error('ImgBB upload error:', imgbbError);
        // Continue with local image if ImgBB fails
      }

      // Delete old local image if exists
      if (product.image && product.imageDetails && product.imageDetails.path) {
        const oldImagePath = path.join(__dirname, '..', product.imageDetails.path);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Add new local image details
      req.body.image = req.file.filename;
      req.body.imageDetails = {
        originalName: req.file.originalname,
        path: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size
      };
    }

    // Set update time
    req.body.updatedAt = Date.now();

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    // Handle image upload
    if (req.file) {
      // First try to upload to ImgBB
      try {
        const imgbbResult = await uploadImage(req.file.path);
        req.body.imgbbImage = imgbbResult;
      } catch (imgbbError) {
        console.error('ImgBB upload error during create:', imgbbError);
        // Continue with local image if ImgBB fails
      }

      // Add local image details (as backup)
      req.body.image = req.file.filename;
      req.body.imageDetails = {
        originalName: req.file.originalname,
        path: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size
      };
    }

    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    // Clean up uploaded file if product creation fails
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Find product to delete
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Note: ImgBB doesn't provide a direct way to delete images via API
    // You would need to save the delete_url and access it manually

    // Delete local image if exists
    if (product.image && product.imageDetails && product.imageDetails.path) {
      const imagePath = path.join(__dirname, '..', product.imageDetails.path);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete product
    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };