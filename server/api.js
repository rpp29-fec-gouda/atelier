const axios = require('axios');
const config = require('../config.js');

axios.defaults.baseURL = config.API;
axios.defaults.headers.common['Authorization'] = config.GITHUB_TOKEN;

module.exports = {
  // get: {
  //   products:
  // }
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
  }
};
