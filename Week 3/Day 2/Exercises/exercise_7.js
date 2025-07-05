const allBooks = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    image: "https://covers.openlibrary.org/b/id/6979861-L.jpg",
    alreadyRead: true
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    image: "https://covers.openlibrary.org/b/id/8228691-L.jpg",
    alreadyRead: false
  }
];


const section = document.querySelector('section');

allBooks.forEach(book => {
  const bookDiv = document.createElement('div');

  const details = document.createElement('p');
  details.textContent = `${book.title} written by ${book.author}`;
  if (book.alreadyRead) {
    details.style.color = 'red';
  }
  bookDiv.appendChild(details);

  const img = document.createElement('img');
  img.src = book.image;
  img.style.width = '100px';
  bookDiv.appendChild(img);

  section.appendChild(bookDiv);
});

