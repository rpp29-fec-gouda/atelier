import React from 'react';

class ProductCompare extends React.Component {
  constructor(props) {
    super(props);

    this.handleHide = this.handleHide.bind(this);
    // this.handleMouseMove = this.handleMouseMove.bind(this);
    // this.handleBlur = this.handleBlur.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    // this.handleDrag = this.handleDrag.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    // this.handleDrop = this.handleDrop.bind(this);

    this.offsetX = 0;
    this.offsetY = 0;

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      x: window.innerWidth * .25,
      y: window.innerHeight * .75
    };
  }

  handleHide(event) {
    event.preventDefault();
    this.props.resetCompare(null);
    this.setState({
      x: undefined,
      y: undefined
    });
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

  handleDragStart(event) {
    // event.preventDefault();
    this.offsetX = event.nativeEvent.offsetX;
    this.offsetY = event.nativeEvent.offsetY;
  }

  // handleDrag(event) {
  //   // event.preventDefault();
  //   let x = event.clientX - this.offsetX;
  //   let y = event.clientY - this.offsetY;

  //   this.setState({ x: x, y: y });
  // }

  handleDragEnd(event) {
    // event.preventDefault();
    let x = event.clientX - this.offsetX;
    let y = event.clientY - this.offsetY;

    console.log(`New position: ${x}, ${y}`);

    this.setState({ x: x, y: y });
  }

  handleDragOver(event) {
    // event.stopPropagation();
    event.preventDefault();
  }

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

    let modalPosition = {};

    if (this.state.x !== undefined && this.state.y !== undefined) {
      modalPosition.left = this.state.x;
      modalPosition.top = this.state.y;
    }

    let key = 0;
    return (
      <form id='ProductCompare' style={modalPosition} draggable='true' onDragStart={this.handleDragStart} onDragOver={this.handleDragOver} onDragEnd={this.handleDragEnd} >
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