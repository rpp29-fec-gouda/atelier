import React from 'react';
import ScrollingArrows from '../shared/ScrollingArrows';
import ImageNavigator from './ImageNavigator';
import MainImage from './MainImage';

const DefaultView = (props) => {
  console.log('Rendering default view');
  return (
    <div id="default-view">
      Default View
      <div class="row">
        <ImageNavigator />
        <div class="column">
          <div class="expanded-view" onClick={props.onClick}>[ ]</div>
          <ScrollingArrows />
        </div>
      </div>
      {/* <MainImage /> */}
    </div>
  );
};

export default DefaultView;