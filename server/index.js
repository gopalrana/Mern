// index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();

// Middleware
app.use(cors({
  origin: ["https://frontend-blond-rho.vercel.app"],
  methods: ["POST", "GET","PUT","DELETE"],
  credentials: true
}));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://rajputgopal321:TyASdV1OZWUbj859@deploy.hgq5wmp.mongodb.net/?retryWrites=true&w=majority&appName=deploy', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Define models inline
const Register = mongoose.model('Register', new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
}));

const Book = mongoose.model('Book', new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true }
}));

// Routes
app.get("/", (req, res) => {
  res.json("Hello");
});

// Registration route
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  Register.findOne({ email })
    .then(user => {
      if (user) {
        res.json("Already have an account");
      } else {
        Register.create({ name, email, password })
          .then(result => res.json(result))
          .catch(err => res.json(err));
      }
    })
    .catch(err => res.json(err));
});

// Books routes
// GET all books
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST a new book
app.post('/api/books', async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    const newBook = new Book({ title, author, genre });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT update a book
app.put('/api/books/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE a book
app.delete('/api/books/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
