const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Order = require('./models/Order');
const Product = require('./models/Product');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Seed initial products if none exist
const seedProducts = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany([
        { name: "Minimalist Headphones", price: "$299", image: "/product_headphones_1782553061327.png" },
        { name: "Modern Timepiece", price: "$199", image: "/product_watch_1782553101043.png" },
        { name: "Essential Mug", price: "$29", image: "/product_mug_1782553132400.png" }
      ]);
      console.log('Database seeded with initial products');
    }
  } catch (err) {
    console.error('Error seeding database:', err);
  }
};

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('MongoDB connected to eProduct_db');
  seedProducts();
})
.catch(err => console.error('MongoDB connection error:', err));

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error('Failed to fetch products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const { productName, price } = req.body;

    if (!productName || !price) {
      return res.status(400).json({ error: 'Product name and price are required' });
    }

    const newOrder = await Order.create({ productName, price });
    res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    console.error('Order creation failed:', error);
    res.status(500).json({ error: 'Failed to create order', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
