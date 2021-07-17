const api = require('./server/api.js');
const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, '/client/dist')));
app.use(express.urlencoded({ extended: true }));

/*
Request methods by app feature:
Products (/products): GET
Reviews (/reviews): GET, POST, PUT
Q&A (/qa): GET, POST, PUT
Related (?): ?
*/

// app.all('*', (req, res) => {
//   console.log(req.method, req.params, req.body);
//   api.fwd(req, res, (err, results) => {
//     if (err) {
//       console.log('API', err.stack);
//     } else {
//       console.log('Data from API:', results);
//       res.json(results);
//     }
//     res.end();
//   });
// });

// app.get('*', (req, res) => (
//   api.fwd(req, res, (err, results) => {
//     if (err) {
//       console.log('API', err.stack);
//     } else {
//       console.log('Data from API:', results);
//       res.json(results);
//     }
//     // res.end();
//   })

// ));

app.get('/products', (req, res) => {
  api.getProducts((err, results) => {
    if (err) {
      console.log('API', err.stack);
    } else {
      console.log('Data from API', results);
      res.json(results);
    }
    res.end();
  });
});

// app.post('/products', (req, res) => {
//   api.updateProducts(req.body, (err, results) => {
//     if (err) {
//       console.log('Product update', err.stack);
//     } else {
//       console.log('Product updated:', results);
//       res.json(results);
//     }
//     res.end();
//   });
// });

app.listen(3000, () => {
  console.log('Listening on port 3000');
});