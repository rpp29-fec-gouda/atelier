import React from 'react';
import Image from '../shared/Image';
import './styleSelector.css';

const StyleSelector = (props) => {
  console.log('Rendering style selector');

  const rowItemLimit = props.rowItemLimit ? props.rowItemLimit : 4;
  const selectedId = props.selectedId ? props.selectedId : 0;

  const hasItems = () => props.items && props.items.length > 0;

  const getItemsByRow = (items) => {
    return hasItems() ? getStylesByRow(items) : getPlaceHolderItems(rowItemLimit);
  }

  const getPlaceHolderItems = (maxItems) => {
    const placeholders = [];
    for (let i = 0; i < maxItems; i++) {
      placeholders.push({ id: i });
    }
    return placeholders;
  };

  const getStylesByRow = (items) => {
    const itemsByRow = [];
    let itemsOnRow = [];

    let rowItemCount = 0;
    items.forEach(item => {
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

  const itemsByRow = getItemsByRow(props.items);

  let rowKey = 0;
  let itemKey = 0;
  return (
    <div id="po-style-selector">
      <h2 class="uppercase no-select">
        <span class="bold">STYLE &gt;</span> { props.name }
      </h2>
      <div id="po-styles-list" class="styles column">
        {
          itemsByRow.map(itemsOnRow => (
            <div key={ rowKey++ } class="row">
              {
                itemsOnRow.map(item => (
                  <div
                    key={ itemKey++ }
                    class="po-style"
                    data-style-id={ item.id }
                    onClick={ handleClick }
                  >
                    {
                      item.thumbnail && item.thumbnail !== null &&
                      <Image
                        imageType="thumbnail"
                        img={{
                          src: item.thumbnail,
                          alt: "style default thumbnail",
                          key: itemKey++,
                          class: "po-style po-style-selector-image",
                          'data-style-id': item.id,
                          onClick: handleClick,
                          }}
                      />
                      // <img
                      //   src={item.thumbnail}
                      //   alt="style default thumbnail"
                      //   key={itemKey++}
                      //   class="po-style po-style-selector-image"
                      //   data-style-id={item.id}
                      //   onClick={handleClick}></img>
                    }
                    {
                      item.id === selectedId &&
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