const express = require('express');
const bookRouter = require('./routes/books');
const app = express();

app.use(express.json());

app.use('/api/books', bookRouter);



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})