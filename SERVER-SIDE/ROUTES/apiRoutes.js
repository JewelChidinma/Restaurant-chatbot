const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Route to handle incoming messages from the client
router.post('/message', async (req, res) => {

  // Get the incoming message from the request body
  const message = req.body.message;

  // Parse the message to determine the user's request
  if (message === '1') {

    // If the user wants to place an order, return the list of items
    const items = await Order.find();
    res.send({ status: 'success', message: 'Here are the available items', data: items });
  } else if (message === '99') {

    // If the user wants to check out their order, return a success message
    // (replace this with actual checkout logic)
    res.send({ status: 'success', message: 'Order placed' });
  } 
  else if (message === '98') {

    // If the user wants to see their order history, return a list of past orders
    const orders = await Order.find({ status: 'completed' });
    res.send({ status: 'success', message: 'Here are your past orders', data: orders });
  } 
  else if (message === '97') {

    // If the user wants to see their current order, return the current order
    const order = await Order.findOne({ status: 'in progress' });
    res.send({ status: 'success', message: 'Here is your current order', data: order });
  }
  else if (message === '0') {

    // If the user wants to cancel their order, cancel it and return a success message
    // (replace this with actual cancellation logic)
    res.send({ status: 'success', message: 'Order cancelled' });
  }
  else {
    
    // If the user's request is invalid, return an error message
    res.send({ status: 'error', message: 'Invalid request' });
  }
});

module.exports = router;
