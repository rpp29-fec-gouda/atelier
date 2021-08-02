import React from 'react';
import DefaultView from './DefaultView';
import ExpandedView from './ExpandedView';
import './imageGallery.css';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);

    // photos={ photos }
    // [
    //   {
    //       "thumbnail_url": ,
    //       "url":
    //   },
    // ]

    this.state = {
      isExpanded: false
    };

    this.handleExpandedView = this.handleExpandedView.bind(this);
    this.handleCollapsedView = this.handleCollapsedView.bind(this);
  }

  handleExpandedView() {
    this.setState({
      isExpanded: true
    });
  }

  handleCollapsedView() {
    this.setState({
      isExpanded: false
    });
  }

  render() {
    console.log('Rendering image gallery');
    return (
      <div id="image-gallery">
        { this.state.isExpanded
          ? <ExpandedView onClick={this.handleCollapsedView} />
          : <DefaultView onClick={this.handleExpandedView} />
        }
      </div>
    );
  }
}

export default ImageGallery;