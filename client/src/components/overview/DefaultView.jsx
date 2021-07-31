import React from 'react';
import ScrollingArrows from '../shared/ScrollingArrows';
import ImageNavigator from './ImageNavigator';
import MainImage from './MainImage';

const DefaultView = (props) => {
  console.log('Rendering default view');
  return (
    <div>
      DefaultView
      <ImageNavigator />
      <ScrollingArrows />
      <div class="expanded-view" onClick={props.onClick}>[ ]</div>
      <MainImage />
    </div>
  );
};

export default DefaultView;