import React from 'react';

class ProductCompare extends React.Component {
  constructor(props) {
    super(props);

    this.handleHide = this.handleHide.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);

    this.offsetX = 0;
    this.offsetY = 0;

    this.state = {
      x: 'calc(50% - 20em)',
      y: '50%'
    };
  }

  handleHide(event) {
    event.preventDefault();
    this.props.resetCompare(null);
    this.setState({
      x: 'calc(50% - 20em)',
      y: '50%'
    });
  }

  handleDragStart(event) {
    event.dataTransfer.setData();
    this.offsetX = event.nativeEvent.offsetX;
    this.offsetY = event.nativeEvent.offsetY;
  }

  handleDrag(event) {
    this.setState({
      x: event.clientX - this.offsetX,
      y: event.clientY - this.offsetY
    });
  }

  handleDragOver(event) {
    event.preventDefault();
  }

  loadCharacteristics(productId) {
    const { checkCache, updateCache, selectedProduct } = this.props;
    let chrs = checkCache('ratings');
  }

  render() {
    if (this.props.compareTo === null) {
      return null;
    }

    const { selectedProduct, compareTo } = this.props;
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

    let modalPosition = {};

    if (this.state.x !== undefined && this.state.y !== undefined) {
      modalPosition.left = this.state.x;
      modalPosition.top = this.state.y;
    }

    let key = 0;
    return (
      <form id='ProductCompare' style={modalPosition}
        draggable='true'
        onDragStart={this.handleDragStart}
        onDrag={this.handleDrag}
        onDragOver={this.handleDragOver}
      >
        <div className='rp-compare-title-bar'>
          <span className='rp-component-title'>COMPARING</span>
          <div className='rp-compare-exit' onClick={ this.handleHide }>+</div>
        </div>
        <div className='rp-compare-header'>
          <span className='rp-title'>{selectedProduct.name}</span><span className='rp-title rp-compare-feature'></span><span className='rp-title'>{compareTo.name}</span>
        </div>
        <div className='rp-invisible-container'>
          {Array.from(featureNames).map(featureName => (
            <div key={key++} className='rp-compare-row'>
              <span>{selectedFeatures[featureName] || ''}</span>
              <span className='rp-compare-feature'>{featureName}</span>
              <span>{alternateFeatures[featureName] || ''}</span>
            </div>
          ))}
        </div>
      </form>
    );
  }
}

export default ProductCompare;