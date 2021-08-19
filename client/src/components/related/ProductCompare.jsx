import React from 'react';

class ProductCompare extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      x: 0,
      y: 0
    };
  }
  // const { selectedProduct, compareTo } = props;

  render() {
    const { selectedProduct, compareTo } = this.props;
    console.log(`Comparing ${selectedProduct.name} and ${compareTo.name}`);
    const rows = [];

    const featureNames = new Set();

    let selectedFeatures = {};
    selectedProduct.features.forEach(feature => {
      const featureName = feature.feature;
      featureNames.add(featureName);
      selectedFeatures[featureName] = feature.value || String.fromCharCode(10003);
    });

    let alternateFeatures = {};
    compareTo.features.forEach(feature => {
      const featureName = feature.feature;
      featureNames.add(featureName);
      alternateFeatures[featureName] = feature.value || String.fromCharCode(10003);
    });

    const modalPosition = {
      x: this.state.width * .5,
      y: this.state.height * .3
    };

    // const modalPositionStyle = {

    // };

    let key = 0;
    return (
      <React.Fragment>
        <div className='rp-compare-title-bar'>
          <span className='rp-component-title'>COMPARING</span>
        </div>
        <div className='rp-compare-row'>
          <span className='rp-title'>{selectedProduct.name}</span><span className='rp-title rp-compare-feature'></span><span className='rp-title'>{compareTo.name}</span>
        </div>
        {Array.from(featureNames).map(featureName => (
          <div key={key++} className='rp-compare-row'>
            <span>{selectedFeatures[featureName] || ''}</span>
            <span className='rp-compare-feature'>{featureName}</span>
            <span>{alternateFeatures[featureName] || ''}</span>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default ProductCompare;