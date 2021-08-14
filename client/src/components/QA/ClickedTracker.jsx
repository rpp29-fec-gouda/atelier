import axios from 'axios';
import React from 'react';

const ClickedTracker = (element) => {
  const body = {
    element: element,
    widget: 'QA',
    time: new Date()
  };

  console.log(body);
  // axios.post('/interactions', body)
  //   .then(res => {
  //     console.log(res);
  //   });
};


export default ClickedTracker;

