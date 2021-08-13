import React from 'react';

const PopupPhoto = (props) => {
  const src = props.src;
  return (
    <div className='popup_photo'>
      <div id='close' className='close' onClick={props.close} >X</div>
      <img className='full_size_photo' src={src}
        width='400em'
        height='400em'></img>
    </div>
  );
};

export default PopupPhoto;
