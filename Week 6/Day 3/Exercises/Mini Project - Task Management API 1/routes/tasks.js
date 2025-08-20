import fs from 'fs';
import path from 'path';
import {fileURLToPath}  from 'url';
import express from 'express';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tasksFile = path.join(__dirname, '../tasks.json');


router.get('/tasks', (req, res)=>{
  fs.readFile(tasksFile, 'utf-8', (err, data)=>{
    if (err) {
      console.error("Error reading tasks file:", err);
      return res.status(500).json({ error: "Failed to load tasks" });
    }

    try{
      const tasks = JSON.parse(data);
      res.json(tasks);
    }catch (err){
      console.error("Error parsing tasks file:", err);
      res.status(500).json({ error: "Invalid tasks format" });
    }
  })
})

router.get('/tasks/:id', (req, res) => {
  fs.readFile(tasksFile, 'utf-8', (err, data) => {
    if (err) {
      console.error("Error reading tasks file:", err);
      return res.status(500).json({ error: "Failed to load tasks" });
    }
    try {
      const tasks = JSON.parse(data);
      const task = tasks.find(task => String(task.id) === String(req.params.id));
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
      res.json(task);
    } catch (err) {
      console.error("Error parsing tasks file:", err);
      res.status(500).json({ error: "Invalid tasks format" });
    }
  });
});

// Validation helper function
const validateTaskData = (task, isUpdate = false) => {
  const errors = [];

  if (!isUpdate) {
    if (!task.id) {
      errors.push("Task ID is required.");
    } else if (typeof task.id !== 'string' && typeof task.id !== 'number') {
      errors.push("Task ID must be a string or number.");
    }
  }

  if (!task.name) {
    errors.push("Task name is required.");
  } else if (typeof task.name !== 'string') {
    errors.push("Task name must be a string.");
  } else if (task.name.trim().length === 0) {
    errors.push("Task name cannot be empty.");
  }

  if (task.hasOwnProperty('completed') && typeof task.completed !== 'boolean') {
    errors.push("Task completed status must be a boolean.");
  }

  return errors;
};

router.post('/tasks', (req, res) => {
  fs.readFile(tasksFile, 'utf-8', (err, data) => {
    let tasks = [];
    if (!err) {
      try {
        tasks = JSON.parse(data);
        if (!Array.isArray(tasks)) tasks = [];
      } catch (e) {
        tasks = [];
      }
    }

    const validationErrors = validateTaskData(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    if (tasks.some(task => String(task.id) === String(req.body.id))) {
      return res.status(400).json({ error: "Task with this ID already exists." });
    }

    const newTask = {
      id: req.body.id,
      name: req.body.name.trim(),
      completed: req.body.completed || false,
      description: req.body.description || "",
      createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    fs.writeFile(tasksFile, JSON.stringify(tasks, null, 2), (err) => {
      if (err) {
        console.error("Error writing tasks file:", err);
        return res.status(500).json({ error: "Failed to save task." });
      }
      res.status(201).json(newTask);
    });
  });
});

router.put('/tasks/:id', (req, res) => {
  fs.readFile(tasksFile, 'utf-8', (err, data) => {
    if (err) {
      console.error("Error reading tasks file:", err);
      return res.status(500).json({ error: "Failed to load tasks." });
    }

    try {
      const tasks = JSON.parse(data);
      const taskIndex = tasks.findIndex(task => String(task.id) === String(req.params.id));

      if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found." });
      }

      const updatedTask = {
        ...tasks[taskIndex],
        ...req.body,
        id: tasks[taskIndex].id // Ensure ID remains unchanged
      };


      tasks[taskIndex] = updatedTask;

      fs.writeFile(tasksFile, JSON.stringify(tasks, null, 2), (err) => {
        if (err) {
          console.error("Error writing to tasks file:", err);
          return res.status(500).json({ error: "Failed to update task" });
        }
        res.json(updatedTask);
      });
    } catch (err) {
      console.error("Error parsing tasks file:", err);
      res.status(500).json({ error: "Invalid tasks format" });
    }
  });
});

// Middleware for validating task ID in routes
const validateTaskId = (req, res, next) => {
  const { id } = req.params;
  if (!id || (typeof id !== 'string' && typeof id !== 'number')) {
    return res.status(400).json({ error: "Invalid or missing task ID." });
  }
  next();
};

// Apply validation middleware to routes with :id
router.delete('/tasks/:id', validateTaskId, (req, res) => {
  fs.readFile(tasksFile, 'utf-8', (err, data) => {
    if (err) {
      console.error("Error reading tasks file:", err);
      return res.status(500).json({ error: "Failed to load tasks." });
    }

    try {
      const tasks = JSON.parse(data);
      const taskIndex = tasks.findIndex(task => String(task.id) === String(req.params.id));
      if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found." });
      }
      const deletedTask = tasks.splice(taskIndex, 1)[0];
      fs.writeFile(tasksFile, JSON.stringify(tasks, null, 2), (err) => {
        if (err) {
          console.error("Error writing tasks file:", err);
          return res.status(500).json({ error: "Failed to delete task." });
        }
        res.json(deletedTask);
      });

    } catch (err) {
      console.error("Error parsing tasks file:", err);
      res.status(500).json({ error: "Invalid tasks format." });
    }
  });
})

export default router;