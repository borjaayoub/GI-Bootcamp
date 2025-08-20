import express from 'express';
import router from './routes/tasks.js';


const PORT = 3000
const app = express();
app.use(express.json());


app.use("/", router);



app.listen(PORT, ()=>{
  console.log(`the server is running on the port ${PORT}`)
})