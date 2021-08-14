import React from 'react';
import PopupPhoto from './PopupPhoto';

class DisplayPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.popupPhoto = this.popupPhoto.bind(this);
    this.state = {
      popupPhoto: false,
      src: ''
    };
  }

  popupPhoto(e) {
    const src = e.target.src || null;
    this.setState({
      popupPhoto: !this.state.popupPhoto,
      src: src
    });
  }

  render() {
    const photos = this.props.photos;
    if (photos) {
      return photos.map((photo, index) => {
        return (
          <div key={photo + index} className='qa-photos-inline'>
            <img className='qa-thumbnail' src={photo} onClick={this.popupPhoto}></img>
            {this.state.popupPhoto ? <PopupPhoto src={this.state.src} close={this.popupPhoto}/> : null}
          </div>
        );
      });
    } else {
      return null;
    }

  }
}

export default DisplayPhotos;

