const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Order = require('./models/Order');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected to eProduct_db'))
.catch(err => console.error('MongoDB connection error:', err));

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
