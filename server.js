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
  api.fwd(req, (err, result) => {
    console.log('API response:');
    if (err) {
      const error = (err.response ? err.response.data : err) + '\n';
      console.log(error);
      res.send(error);
    } else {
      if (Array.isArray(result)) {
        console.log(result.map(result => (JSON.stringify(result))));
        res.json(result);
      } else {
        console.log(result);
        res.send(result);
      }
    }
    res.end();
  })
));

app.listen(3000, () => {
  console.log('Listening on port 3000');
});