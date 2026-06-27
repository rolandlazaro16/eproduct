import mongoose from 'mongoose';

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

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
