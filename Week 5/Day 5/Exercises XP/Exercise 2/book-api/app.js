import express, { json } from  'express';

const app = express();

app.use(express.json());



const books = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    publishedYear: 1960
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    publishedYear: 1949
  },
  {
    id: 3,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    publishedYear: 1925
  }
];

// Read all books
app.get('/api/books', (req,res) =>{
  res.status(200).json(books);
});

// Read a single book by ID
app.get('/api/books/:bookId', (req,res) =>{
  const bookId = Number(req.params.bookId);
  const book = books.find(b => b.id === bookId);

  if(!book){
    return res.status(404).send("Book not found");
  };

  res.status(200).json(book);
});

// Create a new book
app.post('/api/books/', (req, res) =>{
  const {title, author, publishedYear} = req.body;

  if(!title || !author || !publishedYear){
    res.status(400).send("All fields are required");
  };

  const newBook = {
    id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
    title: title,
    author: author,
    publishedYear: publishedYear
  };

  books.push(newBook);
  res.status(201).json("Created");
});

// Start the server
app.listen(5000, ()=>{
  console.log("Server is running on port 5000")
})

