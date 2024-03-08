const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Specify the destination folder for uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename for the uploaded image
  }
});

const upload = multer({ storage: storage });

// Middleware for parsing JSON
app.use(express.json());

// Dummy database for storing user data (replace with a real database)
const users = [];

// Route for user registration
app.post('/register', async (req, res) => {
  try {
    // Extract user details from request body
    const { email, password, type } = req.body;

    // Check if user with the same email already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user details to the database (or any data store of your choice)
    const newUser = { id: users.length + 1, email, password: hashedPassword, type, active: true };
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route for image uploads
app.post('/upload_images', upload.single('image'), (req, res) => {
  // Handle file upload logic here
  res.status(200).json({ message: 'Image uploaded successfully', filename: req.file.filename });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
