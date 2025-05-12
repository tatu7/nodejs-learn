const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const productRoutes = require('./routes/product.route');
const emailRoutes = require('./routes/email.route');
const authRoutes = require('./routes/auth.route');
const swaggerSetup = require('./config/swagger');

const app = express();
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/auth', authRoutes);

// Setup Swagger
swaggerSetup(app);

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
      console.log(`Swagger documentation: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err.message);
  });


