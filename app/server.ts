import { Product } from './server/api.js';
import path from 'path';
import express, { Express, Request, Response } from 'express';
import expressStaticGzip from 'express-static-gzip';

const app: Express = express();
app.use(express.static(path.join(__dirname, '/client/assets')));
app.use('/', expressStaticGzip(path.join(__dirname, '/client/dist'), {enableBrotli: true}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (res: Response) => {
  console.log('Serving index.html');
  res.end();
});

app.get('/multipleProducts', (req: Request, res: Response) => {
  console.log('Fetching', req.query.ids);
  Product.fetchMultiple(req.query.ids)
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

app.all('*', (req: Request, res: Response) => (
  Product.fwd(req, (err, result) => {
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