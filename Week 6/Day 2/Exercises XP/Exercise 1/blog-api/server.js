const express = require('express');
const postRoutes = require('./routes/postRoutes');

const app = express();
app.use(express.json());

// Routes
app.use('/posts', postRoutes);

const PORT = 3000;
app.listen(PORT, ()=>{
  console.log(`Server is running on http://localhost:${PORT}`);
})