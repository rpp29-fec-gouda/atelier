import React from 'react';
import ProductCard from './ProductCard.jsx';
import axios from 'axios';

const Outfit = (props) => {
  const { selectedProduct, selectProduct, outfit, updateOutfit } = props;
  const { localStorage } = window;

  const addToOutfit = () => {
    if (outfit && outfit.includes(selectedProduct)) {
      return;
    }
    const newOutfit = [ selectedProduct, ...outfit ];
    localStorage.setItem('outfit', JSON.stringify(newOutfit.map(item => item.id)));
    console.log('Outfit saved to localStorage:', localStorage.getItem('outfit'));

    updateOutfit(newOutfit);
  };

  const removeFromOutfit = (product) => {
    const match = product.id;
    const newOutfit = [ ...outfit ];
    console.log('Remove', match);
    let i = newOutfit.length;
    while (i--) {
      if (newOutfit[i].id === match) {
        newOutfit.splice(i, 1);
      }
    }

    newOutfit.length ? localStorage.setItem('outfit', JSON.stringify(newOutfit.map(item => item.id))) : localStorage.removeItem('outfit');
    updateOutfit(newOutfit);
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
        {outfit.length ? (
          outfit.map(product => {
            if (typeof product === 'number') {
              return <ProductCard key={ key++ } type='placeholder' value='Loading...' />;
            }
            return <ProductCard key={ `outfitCard${key++}` }
              type='outfit'
              // value={ product.id }
              product={ product }
              selectProduct={ selectProduct }
              action={ removeFromOutfit }
            />;
          })) : null
        }
      </div>
    </div>
  ) : null;
};

export default Outfit;
