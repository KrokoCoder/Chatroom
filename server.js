const express = require('express');
const path = require('path');
const fs = require('fs');
const { getAnswer } = require('./ai');

const app = express();
const port = 15000;

getAnswer('Hello', []).then(console.log);

// Set the root directory for static files
app.use(express.static(path.join(__dirname, 'public')));

// Handle all other routes (serves index.html by default for all routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/new-route', (req, res) => {
  res.send('This is a new route');
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});