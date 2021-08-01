import React from 'react';

const QuantitySelector = (props) => {
  console.log('Rendering Quantity Selector');
  console.log('props.maxQuantity', props.maxQuantity);
  const maxQuantityCapped = Math.min(props.maxQuantity, 15);
  const quantitiesAvailable = props.maxQuantity && maxQuantityCapped > 0;

  if (quantitiesAvailable) {
    const quantities = [];
    for (let i = 1; i <= maxQuantityCapped; i++) {
      quantities.push(i);
    }
    console.log('quantities available', quantities);

    const onChange = (e) => {
      props.onSelect(e.target.value);
    };

    const options = document.querySelectorAll('#quantity option');
    if (options) {
      for (let i = 0; i < options.length; i++) {
        options[i].selected = options[i].defaultSelected;
      }
    }

    let key = 0;
    let defaultValue = 1;
    return (
      <div id="quantity-selector">
        <select id="quantity" name="quantity" defaultValue={ defaultValue } onChange={onChange}>
          {
            quantities.length &&
            quantities.map(quantity => (
              <option key={key++} value={quantity}>{quantity}</option>
            ))
          }
        </select>
      </div>
    );
  } else {
    return (
      <div id="quantity-selector">
        <select id="quantity" name="quantity" disabled>
          <option value={-1}>-</option>
        </select>
      </div>
    );
  }
};

export default QuantitySelector;