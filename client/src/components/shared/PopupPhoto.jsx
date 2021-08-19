import React from 'react';
import './popupPhoto.css';

const PopupPhoto = (props) => {
  const src = props.src;
  return (
    <div className='shared-popup-photo'>
      <img className='shared-full-size-photo' src={src}/>
      <div className='shared-popup-photo-close' onClick={props.close}>X</div>
    </div>
  );
};

export default PopupPhoto;
