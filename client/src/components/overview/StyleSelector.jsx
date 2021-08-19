import React from 'react';
import './styleSelector.css';

const StyleSelector = (props) => {
  console.log('Rendering style selector');

  let rowItemLimit = 4;
  const getItemsByRow = () => {
    const itemsByRow = [];
    let itemsOnRow = [];
    let rowItemCount = 0;
    props.items.forEach(item => {
      rowItemCount++;
      if (rowItemCount > rowItemLimit) {
        itemsByRow.push(itemsOnRow);
        itemsOnRow = [];
        rowItemCount = 1;
      }
      itemsOnRow.push(item);
    });
    if (itemsOnRow.length > 0) {
      itemsByRow.push(itemsOnRow);
    }

    return itemsByRow;
  };

  const handleClick = (e) => {
    props.onClick(e?.target?.dataset?.styleId);
  };

  const itemsByRow = getItemsByRow();
  let rowKey = 0;
  let itemKey = 0;
  return (
    <div id="po-style-selector">
      <h2 class="uppercase no-select">
        <span class="bold">STYLE &gt;</span> {props.name}
      </h2>
      <div id="po-styles-list" class="styles column">
        {
          itemsByRow.length && itemsByRow.length > 0 &&
          itemsByRow.map(itemsOnRow => (
            <div key={rowKey++} class="row">
              {
                itemsOnRow.length && itemsOnRow.length > 0 &&
                itemsOnRow.map(item => (
                  <div key={itemKey++} class="po-style" data-style-id={item.id} onClick={handleClick}>
                    {
                      item.thumbnail && item.thumbnail !== null &&
                      <img src={item.thumbnail} key={itemKey++} class="po-style po-style-selector-image" data-style-id={item.id} onClick={handleClick}></img>
                    }
                    {
                      item.id === props.selectedId &&
                      <div class="po-style-selected">✓</div>
                    }
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default StyleSelector;