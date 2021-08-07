import React from 'react';
import './imageNavigator.css';

const ImageNavigator = (props) => {
  const handleClick = e => {
    let imageId = e?.target?.dataset?.imageId;
    console.log('imageId: ', imageId);
    props.onClick(imageId);
  };

  const usePlaceholders = props.photos.length === 1 && props.photos[0].url === '';
  let count = usePlaceholders ? [0, 1, 2, 3] : [];
  const itemClass = props.icon ? 'icon' : 'thumbmail';

  console.log('Rendering image navigator');
  console.log('ImageNavigator thumbnails', props.photos);
  console.log('props.selectedId', props.selectedId);
  let itemKey = 0;

  return (
    <div class="image-navigator">
      {
        !usePlaceholders &&
        props.photos &&
        props.photos.map(photo => (
          <div key={itemKey++}
            class="image-navigator-item"
            onClick={handleClick}>
            <img
              class="thumbnail"
              data-image-id={photo.id}
              src={photo.url} />
            {
              photo.id === props.selectedId &&
              <div class="image-selected"></div>
            }
          </div>
        ))
      }
      {
        !usePlaceholders &&
        props.icons &&
        props.icons.map(icon => (
          <div key={itemKey++}
            class="image-navigator-item"
            onClick={handleClick}>
            <img class="icon"
              data-image-id={icon.id}
              src={icon.url} />xs
            {
              icon.id === props.selectedId &&
              <div class="image-selected"></div>
            }
          </div>
        ))
      }
      {
        usePlaceholders &&
        count.map(countId => (
          <div key={itemKey++}
            class="image-navigator-item placeholder"
            data-image-id={photo.id}
            onClick={handleClick}>
            {
              countId === props.selectedId &&
              <div class="image-selected"></div>
            }
          </div>
        ))
      }
    </div>
  );
};

export default ImageNavigator;