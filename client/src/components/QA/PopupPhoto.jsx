import React from 'react';

const PopupPhoto = (props) => {
  const src = props.src;
  return (
    <div className='qa-popup-photo'>
      <div className='qa-close' onClick={props.close} >X</div>
      <img className='qa-full-size-photo' src={src}/>
    </div>
  );
};

export default PopupPhoto;
