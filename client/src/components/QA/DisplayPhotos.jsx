import React from 'react';

const DisplayPhotos = (props) => {
  const photos = props.photos;
  if (photos) {
    return photos.map((photo, index) => {
      return (
        <div key={photo + index} className='photos_inline'>
          <img className='thumbnail' src={photo}></img>
        </div>
      );
    });
  } else {
    return null;
  }
};

export default DisplayPhotos;

