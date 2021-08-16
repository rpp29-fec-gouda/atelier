import React from 'react';
import './popupPhoto.css';

const PopupPhoto = (props) => {
  const src = props.src;
  return (
    <div className='shared-popup-photo'>
      <div className='shared-popup-photo-close' onClick={props.close}>X</div>
      <img className='shared-full-size-photo' src={src}/>
    </div>
  );
};

export default PopupPhoto;
