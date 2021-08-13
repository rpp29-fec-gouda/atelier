import React from 'react';
import ProductCard from './ProductCard.jsx';
import axios from 'axios';

class Outfit extends React.Component {
  constructor(props) {
    super(props);

    this.addToOutfit = this.addToOutfit.bind(this);
    this.removeFromOutfit = this.removeFromOutfit.bind(this);

    this.state = {
      outfit: []
    };
  }

  loadOutfit() {
    const { localStorage } = window;
    const outfitData = localStorage.getItem('outfit');

    if (outfitData) {
      const outfit = JSON.parse(outfitData);
      console.log('Outfit found in localStorage:', outfit);
      this.setState({ outfit: outfit });
    }
  }

  addToOutfit() {
    const { localStorage } = window;
    const { selectedProduct } = this.props;
    const { outfit } = this.state;

    if (!outfit.includes(selectedProduct.id)) {
      console.log(`Add ${selectedProduct.id} (${selectedProduct.name}) to outfit`);
      let newOutfit = [ selectedProduct.id, ...outfit ];
      localStorage.setItem('outfit', JSON.stringify(newOutfit));
      console.log('Outfit saved to localStorage:', localStorage.getItem('outfit'));

      this.setState({ outfit: newOutfit });
    }
  }

  removeFromOutfit(productId) {
    const { localStorage } = window;
    const { outfit } = this.state;
    let newOutfit = [ ...outfit ];
    const removalIndex = newOutfit.indexOf(productId);

    if (removalIndex > -1) {
      console.log(`Remove ${productId} from outfit`);
      newOutfit.splice(removalIndex, 1);

      newOutfit.length ? localStorage.setItem('outfit', JSON.stringify(newOutfit)) : localStorage.removeItem('outfit');
      this.setState({ outfit: newOutfit });
    }
  }

  componentDidMount() {
    this.loadOutfit();
  }

  render() {
    const { addToOutfit, removeFromOutfit } = this;
    const { outfit } = this.state;
    const { selectedProduct, selectProduct, checkCache, updateCache } = this.props;

    let key = 0;
    return selectedProduct ? (
      <div id='Outfit'>
        <h1></h1>
        <span className='rp-component-title'>YOUR OUTFIT</span>
        <div className='rp-card-container'>
          <div className='rp-card rp-card-placeholder add-to-outfit' title={`Add ${selectedProduct.name} to outfit`} onClick={ addToOutfit }>
            <h1>+</h1>
            <h2>Add to Outfit</h2>
          </div>
          {outfit.length ? (
            outfit.map(id => {
              return <ProductCard key={ `outfitCard${id}` }
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
  }
}

export default Outfit;
