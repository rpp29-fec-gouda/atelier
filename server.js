const api = require('./server/api.js');
const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, '/client/dist')));
app.use(express.urlencoded({ extended: true }));
// Display any parameters appended to the URL:
// app.use((req, res, next) => {
//   console.log(req.query);
//   next();
// });

app.get('/', (req, res) => {
  console.log('Serving index.html');
  res.end();
});

app.all('*', (req, res) => (
  api.fwd(req, (err, results) => {
    if (err) {
      console.log('From API:', err.response.data);
      res.sendStatus(err.response.status);
    } else {
      console.log('API response:\n', JSON.stringify(results));
      res.json(results);
    }
    res.end();
  })
));

app.listen(3000, () => {
  console.log('Listening on port 3000');
});