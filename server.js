const express = require('express');
const mongoose = require('mongoose');
const { logRequests } = require('./middleware'); // Require the middleware file
const userController = require('./controllers/userController');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/MongoDbimplementation', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Middleware
app.use(express.json());
app.use(logRequests); // Apply the logging middleware

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/users', userController.getAllUsers);
app.post('/users', userController.createUser);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
