import React from 'react';

const SizeSelector = (props) => {
  return (
    <div id="size-selector">
      <select id="sizes" name="sizes" defaultValue={'DEFAULT'}>
        <option value="DEFAULT" disabled hidden>Select Size</option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
    </div>
  );
};

export default SizeSelector;