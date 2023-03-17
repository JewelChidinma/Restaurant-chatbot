const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  items: [{
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    options: [{ type: String }]
  }],
  status: { type: String, required: true, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
