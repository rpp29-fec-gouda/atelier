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
  return (
    <div id="size-selector">
      <select id="sizes" name="sizes" defaultValue={'DEFAULT'} onChange={onChange}>
        <option value="DEFAULT" disabled hidden>Select Size</option>
        {
          items.length &&
          items.map(item => (
            <option key={key++} value={item.sku}>{item.size}</option>
          ))
        }
      </select>
    </div>
  );
};

export default SizeSelector;