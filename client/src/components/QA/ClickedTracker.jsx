import axios from 'axios';
import React from 'react';

const ClickedTracker = (e) => {
  if (e.target.id) {
    const body = {
      element: e.target.id,
      widget: 'QA',
      time: new Date()
    };
    axios.post('/interactions', body)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }
};


export default ClickedTracker;

