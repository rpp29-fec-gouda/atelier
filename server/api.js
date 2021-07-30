const axios = require('axios');
const config = require('../config.js');

axios.defaults.baseURL = config.API;
axios.defaults.headers.common['Authorization'] = config.GITHUB_TOKEN;

module.exports = {
  retrieveList: (req, callback) => {
    console.log(req.body);
    callback(null, 'Test complete');
  },

  fwd: (req, callback) => {

    if (req.method === 'GET') {
      console.log('API query:\n', req.url, req.query);
      return axios.get(req.url)
        .then(response => {
          callback(null, response.data);
        })
        .catch(err => {
          callback(err, null);
        });
    }

    // More varied data attached to POST/PUT requests:
    console.log('API query:\n', req.url, req.params[0], req.query, req.body);
    
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
