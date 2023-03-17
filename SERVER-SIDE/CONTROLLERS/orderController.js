const Order = require('../models/orderModel');

// Controller function for placing an order
exports.placeOrder = (req, res) => {
  const { items } = req.body;
  
  // Create a new order object with the items
  const order = new Order({ items });
  
  // Save the order to the database
  order.save((err, savedOrder) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Could not save order.' });
    }
    
    
    // Respond with the saved order
    res.json({ order: savedOrder });
  });
};

// Controller function for retrieving all placed orders
exports.getOrderHistory = (req, res) => {
  Order.find({}, (err, orders) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Could not retrieve order history.' });
    }
    
    // Respond with all placed orders
    res.json({ orders });
  });
};

// Controller function for retrieving the current order
exports.getCurrentOrder = (req, res) => {
  Order.findOne({}, {}, { sort: { 'createdAt' : -1 } }, (err, order) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Could not retrieve current order.' });
    }
    
    // Respond with the current order
    res.json({ order });
  });
};

// Controller function for canceling the current order
exports.cancelOrder = (req, res) => {
  Order.findOneAndDelete({}, (err, order) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Could not cancel order.' });
    }
    
    // Respond with the canceled order
    res.json({ order });
  });
};
