import React from 'react';

const PopupPhoto = (props) => {
  const src = props.src;
  return (
    <div className='QA_popup_photo'>
      <div className='QA_close' onClick={props.close} >X</div>
      <img className='QA_full_size_photo' src={src}
        width='400em'
        height='400em'></img>
    </div>
  );
};

export default PopupPhoto;
