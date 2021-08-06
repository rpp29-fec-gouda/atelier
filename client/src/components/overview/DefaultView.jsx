import React from 'react';
import ScrollingArrows from '../shared/ScrollingArrows';
import ImageNavigator from './ImageNavigator';

const DefaultView = (props) => {
  console.log('Rendering default view');
  console.log('selectedId', props.selectedId);

  return (
    <div id="default-view">
      Default View
      <div class="row">
        <ImageNavigator
          onClick={props.onClickIndexUpdate}
          photos={props.thumbnails}
          selectedId={props.selectedId}
        />
        <div class="column">
          <div class="expanded-view-toggle" onClick={props.onClickImage}>[+]</div>
          <ScrollingArrows
            callback={props.onClickIndexUpdate}
            max={props.thumbnails?.length - 1}
            stem={true}
          />
        </div>
      </div>
      <div id="main-image">
        <img src={props.photo} />
      </div>
    </div>
  );
};

export default DefaultView;