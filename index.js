const express = require('express');
const mongoose = require('mongoose');

const productRoutes = require('./routes/product.route');

const app = express();
app.use(express.json());

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Set port from environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Option 1: Direct connection (replace with your actual credentials)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://joraqozi:Magicsoft7478@cluster0.dqucllm.mongodb.net/Node-API?retryWrites=true&w=majority';

// Option 2: Using environment variable (recommended)
// const MONGODB_URI = process.env.MONGODB_URI;

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


