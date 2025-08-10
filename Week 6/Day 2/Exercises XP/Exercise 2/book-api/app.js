import express from 'express';
import bookRoutes from "./routes/books.routes.js";

const app = express();
app.use(express.json());

app.use('/api/books', bookRoutes)

const PORT = 5000;
app.listen(PORT, ()=>{
  console.log(`Server is running on http://localhost:${PORT}`);
})