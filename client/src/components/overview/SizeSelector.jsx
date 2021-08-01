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
    props.onSelect(e.target.value);
  };

  let key = 0;
  if (!items || !items.length || items.length === 0) {
    return (
      <div id="size-selector">
        <select id="sizes" name="sizes" defaultValue={-1} onChange={onChange} disabled>
          {
            <option class="uppercase" value={-1} disabled hidden>Out of Stock</option>
          }
        </select>
      </div>
    );
  } else {
    return (
      <div id="size-selector">
        <select id="sizes" name="sizes" defaultValue={-1} onChange={onChange}>
          <option class="uppercase" value={-1} disabled hidden>Select Size</option>
          {
            items.map(item => (
              <option key={key++} value={item.sku}>{item.size}</option>
            ))
          }
        </select>
      </div>
    );
  }
};

export default SizeSelector;