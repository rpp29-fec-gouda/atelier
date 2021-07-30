import React from 'react';
import DefaultView from './DefaultView';
import ExpandedView from './ExpandedView';

class ImageGallery extends React.Component {
  construtor(props) {
    super(props);

    this.state = {
      isExpanded: false
    };
  }

  render() {
    return (
      <div>
        ImageGallery
        { this.state.isExpanded
          ? <ExpandedView />
          : <DefaultView />
        }
      </div>
    );
  }
}

export default ImageGallery;