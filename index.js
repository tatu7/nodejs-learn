const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const productRoutes = require('./routes/product.route');
const emailRoutes = require('./routes/email.route');
const authRoutes = require('./routes/auth.route');

const app = express();
app.use(express.json());

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Set port from environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Using environment variable (recommended for security)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://joraqozi:Magicsoft7478@cluster0.dqucllm.mongodb.net/Node-API?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err.message);
  });


