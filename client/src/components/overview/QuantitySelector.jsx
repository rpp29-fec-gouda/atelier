import React from 'react';

const QuantitySelector = (props) => {
  console.log('Rendering Quantity Selector');
  // console.log('props.maxQuantity', props.maxQuantity);
  const maxQuantityCapped = Math.min(props.maxQuantity, 15);
  const quantitiesAvailable = props.maxQuantity && maxQuantityCapped > 0;

  const resetToDefaultSelected = () => {
    const options = document.querySelectorAll('#po-quantity option');
    for (let i = 0; i < options.length; i++) {
      options[i].selected = options[i].defaultSelected;
    }
  };

  const onChange = (e) => {
    props.onSelect(e?.target?.value);
  };

  const getAttributes = (quantitiesAvailable) => {
    const selectAttributes = {};
    if (quantitiesAvailable) {
      selectAttributes['defaultValue'] = 1;
      selectAttributes['onChange'] = onChange;
    } else {
      selectAttributes['disabled'] = true;
    }
    return selectAttributes;
  }

  const getQuantities = (quantitiesAvailable) => {
    const quantities = [];
    if (quantitiesAvailable) {
      for (let i = 1; i <= maxQuantityCapped; i++) {
        quantities.push(i);
      }
    }
    console.log('quantities available', quantities);
    return quantities;
  }

  const selectAttributes = getAttributes(quantitiesAvailable);
  const quantities = getQuantities(quantitiesAvailable);
  if (quantitiesAvailable) {
    resetToDefaultSelected();
  }

  let key = 0;
  return (
    <div id="po-quantity-selector">
      <select
        id="po-quantity"
        name="quantity"
        { ...selectAttributes }
      >
        {
          quantitiesAvailable ? (
            quantities.map(quantity => (
              <option key={ key++ } value={ quantity }>
                  { quantity }
              </option>
            ))
          ) : (
          <option value={ -1 }>-</option>
          )
        }
      </select>
    </div>
  );
};

export default QuantitySelector;