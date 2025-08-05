import express from 'express';

const app = express();

app.use(express.json());

const data = [
  {
    id: 1,
    title: "Getting Started with JavaScript",
    content: "JavaScript is a powerful programming language that runs in every modern web browser..."
  },
  {
    id: 2,
    title: "Understanding React Hooks",
    content: "React Hooks have revolutionized how we write functional components in React..."
  },
  {
    id: 3,
    title: "Node.js Best Practices for APIs",
    content: "Building robust APIs with Node.js requires following certain best practices..."
  }
];


app.get('/posts', (req, res) =>{
  res.json(data);
});

app.get('/posts/:id', (req, res) =>{
  const id = Number(req.params.id);
  
  const post = data.find(post => post.id === id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Invalid ID parameter. ID must be a positive number.'
    });
  };

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  };

  res.json(post);
});

app.post('/posts', (req, res) =>{
  const {title, content} = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  if (typeof title !== 'string' || typeof content !== 'string') {
    return res.status(400).json({error: 'Title and content must be strings'});
  }

  const newPost = {
    id: data.length + 1,
    title: title,
    content: content
  };
  data.push(newPost);
  res.status(201).json(newPost);
});

app.put('/posts/:id', (req, res) =>{
  const id = Number(req.params.id);
  const {title, content} = req.body;
  const postIndex = data.findIndex((post) => post.id === id);

  if(postIndex === -1){
    return res.status(404).json({error: 'Post not found'});
  };

  if (!title || !content) {
    return res.status(400).json({error: 'Title and content are required for updates'});
  }

  if (typeof title !== 'string' || typeof content !== 'string') {
    return res.status(400).json({error: 'Title and content must be strings'});
  }

  const updatePost = {
    id: data[postIndex].id,
    title: title,
    content: content
  };
  data[postIndex] = updatePost;
  res.status(200).json(updatePost);
});

app.delete('/posts/:id', (req, res) =>{
  const id = Number(req.params.id);
  const postIndex = data.findIndex((post) => post.id === id);
  
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({error: 'Invalid ID parameter. ID must be a positive number.'});
  }

  if(postIndex === -1){
    return res.status(404).json({error: 'Post not found'});
  }

  data.splice(postIndex, 1);
  res.status(200).json({message: 'Post deleted successfully'});
});


app.use((req, res) => {
  res.status(404).json({error: 'Route not found'});
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});


app.listen(3000, () =>{
  console.log('server is listening on port 3000')
})