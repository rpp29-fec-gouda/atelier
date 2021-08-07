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
        {/* <ImageNavigator
          onClick={props.onClickIndexUpdate}
          photos={props.thumbnails}
          selectedId={props.selectedId}
        /> */}
        <div class="column">
          <div class="expanded-view-toggle" onClick={props.onClickImage}>
            <svg viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M1 1v6h2V3h4V1H1zm2 12H1v6h6v-2H3v-4zm14 4h-4v2h6v-6h-2v4zm0-16h-4v2h4v4h2V1h-2z"
              />
            </svg>
          </div>
          <ScrollingArrows
            callback={props.onClickIndexUpdate}
            max={props.thumbnails?.length - 1}
            stem={true}
          />
        </div>
      </div>
      {/* <MainImage /> */}
    </div>
  );
};

export default DefaultView;