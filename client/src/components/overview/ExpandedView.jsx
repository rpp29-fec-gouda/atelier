import React from 'react';
import ScrollingArrows from '../shared/ScrollingArrows';
import ImageNavigator from './ImageNavigator';

class ExpandedView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isZoomed: false
    };
  }

  render() {
    return (
      <div>
        ExpandedView
        { isZoomed
        ? <ExpandedViewZoomed />
        : <div>
            <ImageNavigator />
            <ScrollingArrows />
          </div>
        }
      </div>
    );
  }
}

export default ExpandedView;