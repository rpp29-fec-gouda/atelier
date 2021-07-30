import React from 'react';

const QuantitySelector = (props) => {
  return (
    <div>
      QuantitySelector
      <select id="quantity" name="quantity">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
    </div>
  );
};

export default QuantitySelector;