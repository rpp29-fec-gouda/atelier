import React from 'react';
import './styleSelector.css';

const StyleSelector = (props) => {
  console.log('Rendering style selector');

  // selectedId = { styleId }
  // items={ selectorItems }
  // onClick={ this.handleStyleClick }
  console.log('Style items:', JSON.stringify(props.items));

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

    return itemsByRow;
  };

  const itemsByRow = getItemsByRow();

  return (
    <div id="style-selector">
      <h2 class="uppercase no-select">
        <span class="bold">STYLE &gt;</span> {props.name}
      </h2>
      <div class="styles column">
        {
          itemsByRow.length &&
          itemsByRow.map(itemsOnRow => (
            <div class="row">
              {
                itemsOnRow.length &&
                itemsOnRow.map(item => (
                  <div class="style" onClick={props.onClick}>
                    {
                      item.id === props.selectedId &&
                      <div class="style-selected">✓</div>
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