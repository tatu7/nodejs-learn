const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  image: {
    type: String,
    default: null
  },
  imageDetails: {
    originalName: String,
    path: String,
    mimetype: String,
    size: Number
  },
  // ImgBB specific fields
  imgbbImage: {
    id: String,
    url: String,
    display_url: String,
    delete_url: String,
    thumbnail: String,
    size: Number,
    time: Number,
    expiration: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add virtual for image URL
productSchema.virtual('imageUrl').get(function () {
  // Prefer ImgBB URL if available
  if (this.imgbbImage && this.imgbbImage.display_url) return this.imgbbImage.display_url;

  // Fall back to local image if no ImgBB image
  if (!this.image) return null;
  return `/uploads/products/${this.image}`;
});

module.exports = mongoose.model('Product', productSchema);
