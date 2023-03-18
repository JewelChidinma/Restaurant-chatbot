// Import the necessary libraries and modules
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Import the API routes
const apiRoutes = require('./Routes/apiRoutes');

// Set up the Express app
const app = express();
app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());

// Set up the MongoDB connection
mongoose.connect('mongodb+srv://Jewelchidinma:Mmalistic41023@chatbotcluster.rbiawhd.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Set up the server and Socket.IO
const server = http.createServer(app);
const io = socketio(server);
io.on('connection', socket => {
  console.log('Client connected');

  // Add a listener for incoming messages from the client
  socket.on('chat message', message => {
    console.log('Message received:', message);

    // Pass the message to the API routes for processing
    apiRoutes.processMessage(message, (response) => {
      console.log('Response:', response);

      // Send the response back to the client
      socket.emit('chat message', response);
    });
  });

  // Add a listener for disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

