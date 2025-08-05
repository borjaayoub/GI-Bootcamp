import express from 'express';
import dataService from './data/dataService.js';

const app = express();
app.use(express.json())

app.get('/posts', async (req, res) => {
  try {
    const posts = await dataService.fetchPosts();
    console.log('Data has been successfully retrieved and sent as a response');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

app.listen(5000, ()=>{
  console.log("Server is running on the port 5000");
})