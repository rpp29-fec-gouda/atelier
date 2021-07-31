import React from 'react';

const StyleSelector = (props) => {
  return (
    <div id="style-selector">
      <h2 class="uppercase no-select">
        <span class="bold">STYLE &gt;</span> SELECTED STYLE
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