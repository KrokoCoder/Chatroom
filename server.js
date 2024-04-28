const express = require('express');
const path = require('path');
const fs = require('fs');
const { getAnswer } = require('./ai');
const bodyParser = require('body-parser');

const app = express();
const port = 15000;

var jsonParser = bodyParser.json();

// Set up the body parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Set the root directory for static files
app.use(express.static(path.join(__dirname, 'public')));

// Handle all other routes (serves index.html by default for all routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.post('/chat', jsonParser, (req, res) => {
  var request = req.body;
  console.log(request);
  var message = request.query;
  getAnswer(message, []).then((answer) => {
    var ans = {
      answer: answer
    };
    res.send(ans);
  });
});

// expose to all network interfaces
app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});