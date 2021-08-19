import React from 'react';

const QuantitySelector = (props) => {
  console.log('Rendering Quantity Selector');
  console.log('props.maxQuantity', props.maxQuantity);
  const maxQuantityCapped = Math.min(props.maxQuantity, 15);
  const quantitiesAvailable = props.maxQuantity && maxQuantityCapped > 0;

  const resetToDefaultSelected = () => {
    const options = document.querySelectorAll('#po-quantity option');
    for (let i = 0; i < options.length; i++) {
      options[i].selected = options[i].defaultSelected;
    }
  };

  if (quantitiesAvailable) {
    const quantities = [];
    for (let i = 1; i <= maxQuantityCapped; i++) {
      quantities.push(i);
    }
    console.log('quantities available', quantities);

    const onChange = (e) => {
      props.onSelect(e?.target?.value);
    };

    resetToDefaultSelected();

    let key = 0;
    let defaultValue = 1;
    return (
      <div id="po-quantity-selector">
        <select id="po-quantity" name="quantity" defaultValue={ defaultValue } onChange={onChange}>
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
      <div id="po-quantity-selector">
        <select id="po-quantity" name="quantity" disabled>
          <option value={-1}>-</option>
        </select>
      </div>
    );
  }
};

export default QuantitySelector;