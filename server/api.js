const axios = require('axios');
const config = require('../config.js');

axios.defaults.baseURL = config.API;
axios.defaults.headers.common['Authorization'] = config.GITHUB_TOKEN;

module.exports = {
  fwd: (req, callback) => {
    console.log('API query:\n', req.url, req.params[0], req.query);

    if (req.method === 'GET') {
      return axios.get(req.url)
        .then(response => {
          callback(null, response.data);
        })
        .catch(err => {
          callback(err, null);
        });
    }

    if (req.method === 'POST') {
      return axios.post(req.url, req.body)
        .then(response => {
          callback(null, response.data);
        })
        .catch(err => {
          callback(err, null);
        });
    }

    return axios.put(req.url, req.body)
      .then(response => {
        callback(null, response.data);
      })
      .catch(err => {
        callback(err, null);
      });
  }
};
