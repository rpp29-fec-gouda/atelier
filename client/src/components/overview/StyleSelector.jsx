import React from 'react';
import './styleSelector.css';

const StyleSelector = (props) => {
  console.log('Rendering style selector');

  // selectedId = { styleId }
  // items={ selectorItems }

  return (
    <div id="style-selector">
      <h2 class="uppercase no-select">
        <span class="bold">STYLE &gt;</span> {props.name}
      </h2>
      <div class="styles column">
        <div class="row">
          <div class="style">
            <div class="style-selected">✓</div>
          </div>
          <div class="style"></div>
          <div class="style"></div>
          <div class="style"></div>
        </div>
        <div class="row">
          <div class="style"></div>
          <div class="style"></div>
          <div class="style"></div>
          <div class="style"></div>
        </div>
      </div>
    </div>
  );
};

export default StyleSelector;