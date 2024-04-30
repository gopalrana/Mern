const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const RegisterModel = require('./models/Register')

const app = express()
app.use(cors(
    {
        origin: ["https://mern-5lhg-7ig7ik8sp-gopalrajputs-projects.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
app.use(express.json())

mongoose.connect('mongodb+srv://rajputgopal321:TyASdV1OZWUbj859@deploy.hgq5wmp.mongodb.net/?retryWrites=true&w=majority&appName=deploy');


app.get("/", (req, res) => {
    res.json("Hello");
})
app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    RegisterModel.findOne({email: email})
    .then(user => {
        if(user) {
            res.json("Already have an account")
        } else {
            RegisterModel.create({name: name, email: email, password: password})
            .then(result => res.json(result))
            .catch(err => res.json(err))
        }
    }).catch(err => res.json(err))
})


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


app.listen(3001, () => {
    console.log("Server is Running")
})
