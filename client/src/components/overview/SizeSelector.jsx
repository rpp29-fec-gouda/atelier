import React from 'react';

const SizeSelector = (props) => {
  return (
    <div>
      SizeSelector
      <select id="sizes" name="sizes">
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
    </div>
  );
};

export default SizeSelector;