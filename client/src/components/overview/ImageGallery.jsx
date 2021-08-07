import React from 'react';
import DefaultView from './DefaultView';
import ExpandedView from './ExpandedView';
import './imageGallery.css';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);

    this.thumbnails = this.getPhotoThumbnailUrls(props.photos);

    this.state = {
      isExpanded: false,
      selectedPhotoIndex: 0
    };

    this.handleExpandedView = this.handleExpandedView.bind(this);
    this.handleCollapsedView = this.handleCollapsedView.bind(this);
    this.updateIndex = this.updateIndex.bind(this);
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

  updateIndex(index) {
    console.log('Updating selectedPhotoIndex: ', index);
    this.setState({
      selectedPhotoIndex: index
    });
  }

  getPhotoThumbnailUrls(photos) {
    const thumbnails = [];
    let counter = 0;
    photos?.forEach(photo => {
      thumbnails.push({
        id: counter++,
        url: photo.thumbnail_url
      });
    });
    return thumbnails;
  }

  getSelectedPhotoUrl(index) {
    if (!this.props.photos) {
      return '';
    }
    return this.props.photos[index]?.url;
  }

  render() {
    console.log('Rendering image gallery');
    console.log('ImageGallery photos', this.props.photos);
    const currentIndex = this.state.selectedPhotoIndex;
    console.log('currentIndex', currentIndex);
    return (
      <div id="image-gallery">
        { this.state.isExpanded
          ? <ExpandedView
            thumbnails={this.thumbnails}
            photo={this.getSelectedPhotoUrl(currentIndex)}
            selectedId={currentIndex}
            onClickImage={this.handleCollapsedView}
            onClickIndexUpdate={this.updateIndex}
          />
          : <DefaultView
            thumbnails={this.thumbnails}
            photo={this.getSelectedPhotoUrl(currentIndex)}
            selectedId={currentIndex}
            onClickImage={this.handleExpandedView}
            onClickIndexUpdate={this.updateIndex}
          />
        }
      </div>
    );
  }
}

export default ImageGallery;