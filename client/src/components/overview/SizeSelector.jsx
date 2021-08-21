import React from 'react';

const SizeSelector = (props) => {
  const items = [];
  for (let i = 0; i < props.skus.length; i++) {
    items.push({
      sku: props.skus[i],
      size: props.sizes[i]
    });
  }

  const onChange = (e) => {
    props.onSelect(e?.target?.value);
  };

  let key = 0;
  const isInStock = (items && items.length > 0);
  const defaultMessage = isInStock ? 'Select Size' : 'Out of Stock';
  return (
    <div id="po-size-selector">
      <select
        id="po-sizes"
        name="sizes"
        defaultValue={ -1 }
        onChange={ onChange }
        disabled={ !isInStock }
      >
        <option
          class="uppercase"
          value={ -1 }
          disabled
          hidden
        >
        { defaultMessage }
        </option>
        {
          isInStock &&
          items.map(item => (
            <option
              key={ key++ }
              value={ item.sku }>{ item.size }
            </option>
          ))
        }
      </select>
    </div>
  );
};

export default SizeSelector;