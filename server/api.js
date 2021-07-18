const axios = require('axios');
const config = require('../config.js');

axios.defaults.baseURL = config.API;
axios.defaults.headers.common['Authorization'] = config.GITHUB_TOKEN;

const retrieve = (endpoint, callback) => {
  console.log('GET request to ' + endpoint);
  return axios.get(endpoint)
    .then(res => {
      console.log('Data recieved from API:', res.data);
      callback(null, res.data);
    })
    .catch(err => {
      console.log('API', err);
      callback(err, null);
    });
};

module.exports = {
  products: {
    get: (req, callback) => {
      console.log(req.url, req.params, req.body);
      callback(null, 'OK');
    }
  },
  reviews: {
    get: () => {},
    post: () => {},
    put: () => {}
  },
  qa: {
    get: () => {},
    post: () => {},
    put: () => {}
  },
  cart: {
    get: () => {},
    post: () => {},
    put: () => {}
  },
  interactions: {
    get: () => {},
    post: () => {},
    put: () => {}
  },
  getProducts: (callback) => {
    return axios.get('/products')
      .then(res => {
        // console.log('Data recieved from API:', res.data);
        callback(null, res.data);
      })
      .catch(err => {
        // console.log('API', err);
        callback(err, null);
      });
  },
  fwd: (req, res, callback) => {
    const endpoint = req.url;
    console.log(endpoint);
    if (req.method === 'POST') {

    }

    return axios.get(req.url)
      .then(response => {
        callback(null, response.data);
      })
      .catch(err => {
        // console.log('API', err.stack);
        callback(err, null);
      });
  }
};
