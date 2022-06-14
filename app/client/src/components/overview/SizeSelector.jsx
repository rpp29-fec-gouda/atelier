import React from 'react';

class SizeSelector extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.state = {
      currentSize: ''
    }
  }

  componentDidUpdate() {
    const items = this.getItems(this.props.skus, this.props.sizes);
    const isInStock = (items && items.length > 0);
    console.log('componentDidUpdate - Size Selector:');
    console.log('isInStock', isInStock);
    console.log('this.state.currentSize', this.state.currentSize);
    console.log('this.props.sizes', this.props.sizes);

    if (isInStock && this.state.currentSize !== '' && this.props.sizes.indexOf(this.state.currentSize) === -1) {
      console.log('Resetting current size');
      this.setState({ currentSize: '' });
    }
  }

  getItems(skus, sizes) {
    const items = [];
    for (let i = 0; i < skus.length; i++) {
      items.push({
        sku: skus[i],
        size: sizes[i]
      });
    }

    return items;
  }

  resetToDefaultSelected() {
    console.log('Resetting size selected')
    const options = document.querySelectorAll('#po-sizes option');
    for (let i = 0; i < options.length; i++) {
      options[i].selected = options[i].defaultSelected;
    }
  }

  onChange(e) {
    const newSku = e?.target?.value;
    const index = this.props.skus.indexOf(newSku);
    if (index > -1) {
      const newSize = this.props.sizes[index];
      if (newSku) {
        console.log('Size onChange:', newSize);
        this.setState({ currentSize: newSize})
        this.props.onSelect(newSku);
      }
    }
  };

  render() {
    const items = this.getItems(this.props.skus, this.props.sizes);
    const isInStock = (items && items.length > 0);
    const defaultMessage = isInStock ? 'Select Size' : 'Out of Stock';

    console.log('Current Size: ', this.state.currentSize);

    if (isInStock && this.props.sizes.indexOf(this.state.currentSize) === -1) {
      this.resetToDefaultSelected();
    }

    let key = 0;
    return (
      <div id="po-size-selector">
        <select
          id="po-sizes"
          name="sizes"
          defaultValue={ -1 }
          onChange={ this.onChange }
          disabled={ !isInStock }
        >
          <option
            class="uppercase"
            value={ -1 }
            disabled
            hidden
          >
          { defaultMessage }
          </option>
          {
            isInStock &&
            items.map(item => (
              <option
                key={ key++ }
                value={ item.sku }>{ item.size }
              </option>
            ))
          }
        </select>
      </div>
    );
  }
}

export default SizeSelector;