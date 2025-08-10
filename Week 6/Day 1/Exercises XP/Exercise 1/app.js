const express = require('express');
const indexRouter = require('./routes/todos');
const app = express();


app.use('/', indexRouter);


const PORT = 3000
app.listen(PORT, ()=>{
  console.log(`Server is running on http://localhost:${PORT}`)
})