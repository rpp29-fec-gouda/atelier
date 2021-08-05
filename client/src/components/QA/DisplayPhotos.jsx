import React from 'react';

const DisplayPhotos = (props) => {
  const photos = props.photos;
  if (photos.length > 0) {
    return photos.map((photo, index) => {
      return (
        <div key={photo} className='photos_inline'>
          <img className='thumbnail' src={photo}></img>
        </div>
      );
    });
  } else {
    return null;
  }
};

export default DisplayPhotos;

