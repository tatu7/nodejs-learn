const imgbbUploader = require('imgbb-uploader');
const fs = require('fs');
require('dotenv').config();

// Get API key from environment variables
const IMGBB_API_KEY = process.env.IMGBB_API_KEY;

/**
 * Upload image to ImgBB
 * @param {String} imagePath - Path to local file
 * @returns {Object} - ImgBB upload response
 */
const uploadImage = async (imagePath) => {
  if (!IMGBB_API_KEY) {
    throw new Error('ImgBB API key is not set in environment variables');
  }

  try {
    // Read image as base64
    const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });

    const options = {
      apiKey: IMGBB_API_KEY,
      base64string: imageBase64,
      name: `product_${Date.now()}`,
      expiration: 0 // No expiration
    };

    const result = await imgbbUploader(options);

    return {
      id: result.id,
      url: result.url,
      display_url: result.display_url,
      delete_url: result.delete_url,
      thumbnail: result.thumb?.url,
      size: result.size,
      time: result.time,
      expiration: result.expiration
    };
  } catch (error) {
    console.error('ImgBB upload error:', error);
    throw new Error('Failed to upload image to ImgBB: ' + error.message);
  }
};

module.exports = {
  uploadImage
}; 