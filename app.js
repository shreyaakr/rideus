const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Rideus!', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a MongoDB schema and model (assuming you want a 'User' model)
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Middleware to parse incoming JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (your HTML, CSS, and JS)
app.use(express.static('public'));

// Route to handle user registration
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Create a new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to handle user login
app.post('/login', async (req, res) => {
  // Implement login logic here
  // Check user credentials, authenticate, and generate a token if needed
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
