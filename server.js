const api = require('./server/api.js');
const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('/products', (req, res) => {
  api.getProducts((err, results) => {
    if (err) {
      console.log('Failed to retrieve data from API', err.stack);
    } else {
      console.log('Server has data from API', results);
      res.json(results);
    }
    res.end();
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});