import React from 'react';

class ProductCompare extends React.Component {
  constructor(props) {
    super(props);

    // this.handleMouseMove = this.handleMouseMove.bind(this);
    // this.handleBlur = this.handleBlur.bind(this);
    // this.handleDragStart = this.handleDragStart.bind(this);
    // this.handleDragOver = this.handleDragOver.bind(this);
    // this.handleDrop = this.handleDrop.bind(this);

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      x: 0,
      y: 0
    };
  }

  // handleMouseMove(event) {
  //   this.setState({
  //     x: event.clientX,
  //     y: event.clientY
  //   });
  // }

  // handleBlur(event) {
  //   // event.stopPropagation();
  //   console.log(event.currentTarget, event.relatedTarget);
  //   if (!event.currentTarget.contains(event.relatedTarget)) {
  //     this.props.resetCompare(null);
  //   }
  // }

  // handleDragStart(event) {
  //   // event.stopPropagation();
  //   let x = event.nativeEvent.offsetX;
  //   let y = event.nativeEvent.offsetY;

  //   console.log(`Grabbed at: ${x}, ${y}`);
  //   this.offsetX = event.nativeEvent.offsetX;
  //   this.offsetY = event.nativeEvent.offsetY;
  // }

  // handleDragOver(event) {
  //   event.stopPropagation();
  //   event.preventDefault();
  // }

  // handleDrop(event) {
  //   // event.stopPropagation();
  //   let x = event.clientX - this.offsetX;
  //   let y = event.clientY - this.offsetY;

  //   console.log(`New position: ${x}, ${y}`);

  //   this.setState({
  //     x: x,
  //     y: y
  //   });
  // }

  render() {
    if (this.props.compareTo === null) {
      return null;
    }

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

    let key = 0;
    return (
      <form id='ProductCompare' draggable='true'>
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
      </form>
    );
  }
}

export default ProductCompare;