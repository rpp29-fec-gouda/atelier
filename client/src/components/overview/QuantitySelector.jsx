import React from 'react';

const QuantitySelector = (props) => {
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

    let key = 0;
    return (
      <div id="quantity-selector">
        <select id="quantity" name="quantity" defaultValue="1" onChange={onChange}>
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
          <option value="0">-</option>
        </select>
      </div>
    );
  }
};

export default QuantitySelector;