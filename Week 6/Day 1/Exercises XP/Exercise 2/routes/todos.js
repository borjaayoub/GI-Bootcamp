const express = require('express');

const router = express.Router();

let todos = [
  { id: 1, title: 'Learn Express', completed: true },
  { id: 2, title: 'Build API', completed: false }
];


// Get all to-do items
router.get('/todos', (req, res) =>{
  res.json(todos);
})

// Add a new to-do item
router.post('/todos', (req, res) =>{
  const title = req.body.title;

  if(!title) return res.status(400).json('Title is required');

  const newTodo = {
    id: todos.length + 1,
    title: title,
    completed: req.body.completed || false
  }

  todos.push(newTodo);
  res.status(201).json(newTodo);
})

// Update a to-do item by ID
router.put('/todos/:id', (req,res) =>{
  const id = Number(req.params.id);
  const todo = todos.find(todo => todo.id === id);

  if(!todo) return res.status(404).json('Not found');
  
  todo.title = req.body.title || todo.title;
  todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;

  res.json(todo);
})

// Delete a to-do item by ID
router.delete('/todos/:id', (req, res) =>{
  const id = Number(req.params.id);
  const todo = todos.find(todo => todo.id === id);

  if(!todo) return res.status(404).json('Not found');

  const index = todos.indexOf(todo);

  todos.splice(index, 1);

  res.json(`'${todo.title}' has been deleted.`);
})


module.exports = router