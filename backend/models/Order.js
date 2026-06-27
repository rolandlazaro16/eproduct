const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'Please provide a product name'],
  },
  price: {
    type: String,
    required: [true, 'Please provide a price'],
  },
  status: {
    type: String,
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Order || mongoose.model('Order', OrderSchema);
