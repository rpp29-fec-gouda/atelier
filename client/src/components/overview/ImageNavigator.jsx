import React from 'react';

const ImageNavigator = (props) => {
  return (
    <div class="image-navigator">
      <div class="image-navigator-item">
        <div class="icon"></div>
        <div class="selected"></div>
      </div>
      <div class="image-navigator-item">
        <div class="thumbnail"></div>
        <div></div>
      </div>
      <div class="image-navigator-item">
        <div class="icon"></div>
        <div></div>
      </div>
      <div class="image-navigator-item">
        <div class="thumbnail"></div>
        <div></div>
      </div>
    </div>
  );
};

export default ImageNavigator;