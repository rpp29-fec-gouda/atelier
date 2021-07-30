import React from 'react';
import ScrollingArrows from '../shared/ScrollingArrows';
import ImageNavigator from './ImageNavigator';
import MainImage from './MainImage';

const DefaultView = (props) => {
  return (
    <div>
      DefaultView
      <ImageNavigator />
      <ScrollingArrows />
      <MainImage />
    </div>
  );
};

export default DefaultView;