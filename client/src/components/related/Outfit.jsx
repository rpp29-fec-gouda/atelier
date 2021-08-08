import React from 'react';
import ProductCard from './ProductCard.jsx';
import axios from 'axios';

const Outfit = (props) => {
  const { selectedProduct, selectProduct, productIds, updateOutfit, checkCache, updateCache } = props;
  const { localStorage } = window;

  const addToOutfit = () => {
    if (productIds.length && !productIds.includes(selectedProduct.id)) {
      console.log(`Add ${selectedProduct.id} (${selectedProduct.name}) to outfit`);
      let newOutfit = [ selectedProduct.id, ...productIds ];
      localStorage.setItem('outfit', JSON.stringify(newOutfit));
      console.log('Outfit saved to localStorage:', localStorage.getItem('outfit'));

      updateOutfit([ ...newOutfit ]);
    }
  };

  const removeFromOutfit = (productId) => {
    let newOutfit = [ ...productIds ];
    const removalIndex = newOutfit.indexOf(productId);

    if (removalIndex > -1) {
      console.log(`Remove ${productId} from outfit`);
      newOutfit.splice(removalIndex, 1);

      newOutfit.length ? localStorage.setItem('outfit', JSON.stringify(newOutfit)) : localStorage.removeItem('outfit');
      updateOutfit([ ...newOutfit ]);
    }
  };

  let key = 0;
  return selectedProduct ? (
    <div id='Outfit'>
      <h1></h1>
      <span className='rp-component-title'>YOUR OUTFIT</span>
      <div className='rp-card-container'>
        <div className='rp-card rp-card-placeholder' title={`Add ${selectedProduct.name} to outfit`} onClick={ addToOutfit }>
          <h1>+</h1>
          <h2>Add to Outfit</h2>
        </div>
        {productIds.length ? (
          productIds.map(id => {
            return <ProductCard key={ `outfitCard${key++}` }
              type='Outfit'
              // value={ product.id }
              productId={ id }
              selectProduct={ selectProduct }
              action={ removeFromOutfit }
              checkCache={ checkCache }
              updateCache={ updateCache }
            />;
          })) : null
        }
      </div>
    </div>
  ) : null;
};

export default Outfit;
