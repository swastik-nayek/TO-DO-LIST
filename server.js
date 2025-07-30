const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const conn = require('./db'); // Correct variable used

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.json());

// Get tasks
app.get('/api/tasks', (req, res) => {
  conn.query('SELECT * FROM tasks', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Add task
app.post('/api/tasks', (req, res) => {
  const { description, expectedAt } = req.body;
  const sql = "INSERT INTO tasks (description, expected_at, created_at) VALUES (?, ?, NOW())";
  conn.query(sql, [description, expectedAt], (err, result) => {
    if (err) {
      console.error(err); 
      return res.status(500).send(err);
    }
    res.status(201).json({ id: result.insertId });
  });
});

// Delete task
app.delete('/api/tasks/:id', (req, res) => {
  conn.query('DELETE FROM tasks WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

// Toggle complete
app.put('/api/tasks/:id', (req, res) => {
  conn.query('UPDATE tasks SET completed = NOT completed WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
