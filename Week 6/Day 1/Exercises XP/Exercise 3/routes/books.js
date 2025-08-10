const express = require('express');

const router = express.Router();

let books = [];

// Get all books
router.get('/', (req, res) =>{
  res.json(books);
})

// Add a new book
router.post('/', (req, res) =>{
  const {title, author, description, year} = req.body;
  
  if(!title || !author || !description || !year){
    res.status(400).json('Must fill all the inforamtion');
  }

  const newBook = {
    id: books.length + 1,
    title,
    author,
    description,
    year
  }

  books.push(newBook);
  res.status(201).json(`'${newBook.title}' has beend added successfuly`);
})


// Update a book by ID
router.put('/:bookId', (req, res) =>{
  const bookId = Number(req.params.bookId);
  const book = books.find(b => b.id === bookId)

  if(!book) return res.status(404).json('Book not found');
  
  const {title, author, description, year} = req.body;

  book.title = title || book.title;
  book.author = author || book.author;
  book.description = description || book.description;
  book.year = year || book.year;

  res.json(`'${book.title}' has been updated successfuly`)
})



// Delete a book by ID
router.delete('/:bookId', (req, res) =>{
  const bookId = Number(req.params.bookId);
  const bookIndex = books.findIndex(b => b.id === bookId);

  if(bookIndex === -1) return res.status(404).json('Book not found');

  books.splice(bookIndex, 1);

  res.json(`'${req.body.title}' has been deleted successfuly`);
})


module.exports = router;