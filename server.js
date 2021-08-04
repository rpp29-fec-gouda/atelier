const api = require('./server/api.js');
const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, '/client/dist')));
app.use(express.static(path.join(__dirname, '/client/assets')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Display any parameters appended to the URL:
// app.use((req, res, next) => {
//   console.log(req.query);
//   next();
// });

app.get('/', (req, res) => {
  console.log('Serving index.html');
  res.end();
});

app.get('/multipleProducts', (req, res) => {
  console.log('Fetching', req.query.ids);
  api.fetchMultiple('/products?product_id=', req.query.ids)
    .then(result => {
      console.log(JSON.stringify(result.data));
      res.json(result.data);
    })
    .catch(err => {
      res.sendStatus(500);
    })
    .then(() => {
      res.end();
    });
});

app.all('*', (req, res) => (
  api.fwd(req, (err, result) => {
    console.log('API response:');
    if (err) {
      const error = (err.response ? err.response.data : err) + '\n';
      console.log(error);
      res.sendStatus(500);
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