import React from 'react';
import ImageNavigatorModel from './ImageNavigatorModel';
import './imageNavigator.css';

class ImageNavigator extends React.Component {
  constructor(props = {
    thumbnails,
    useIcons,
    length,
    selectedId,
    onClick
  }) {
    super(props);

    this.injectProperties = this.injectProperties.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);

    this.model = new ImageNavigatorModel(this.injectProperties(true));
    this.onClick = this.props.onClick ? this.props.onClick : () => {};

    this.state = {
      startIndex: this.model.startIndex
    };
  }

  injectProperties(initialize) {
    return {
      thumbnails: this.props.thumbnails,
      useIcons: this.props.useIcons ? this.props.useIcons : false,
      length: this.props.length,
      maxItems: this.props.maxItems ? this.props.maxItems : 7,
      startIndex: initialize ? 0 : this.state.startIndex
    };
  }

  handleClick(e) {
    if (e.currentTarget.hasAttribute('data-image-id')) {
      e.stopPropagation();
      let imageId = parseInt(e.currentTarget.dataset.imageId);
      if (imageId !== this.props.selectedId) {
        this.onClick(imageId);
      }
    }
  }

  handleDecrement(e) {
    e.stopPropagation();
    if (this.model.decrementIndex()) {
      this.setState({
        startIndex: this.model.startIndex
      });
    }
  }

  handleIncrement(e) {
    e.stopPropagation();
    if (this.model.incrementIndex()) {
      this.setState({
        startIndex: this.model.startIndex
      });
    }
  }

  render() {
    console.log('Rendering image navigator');
    this.model = new ImageNavigatorModel(this.injectProperties());
    const model = this.model;

    const { startIndex, endIndex } = model;
    const useCase = model.getUseCase();
    const items = model.getItemUrls();

    const itemClass = model.getItemParentClass();
    const itemChildClass = model.getItemChildClass();
    const itemChildClassSelected = itemChildClass + ' selected';

    let itemKey = startIndex;

    return (
      <div class="image-navigator-component">
        {
          model.firstIndexNotVisible(startIndex) &&
          <div class={itemClass} onClick={this.handleDecrement}>
            <div class="navigator-align">
              <div class="image-navigator-control image-navigator-decrement">
                <svg viewBox="0,0,1000,837">
                  <path
                    d="M71.9816+837.371L500.008+309.729L928.018+837.371L1000+778.965L500.008+162.629L0+778.965L71.9816+837.371Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        }
        {
          items.map(item => (
            <div key={itemKey++}
              class={itemClass}
              data-image-id={item.id}
              onClick={this.handleClick}>
              {
                useCase.thumbnails &&
                <img
                  class={itemChildClass}
                  src={item.url}
                  alt="selected style thumbnail"
                />
              }
              {
                useCase.icons &&
                <svg
                  class={item.id === this.props.selectedId ? itemChildClassSelected : itemChildClass}
                  viewBox="0,0,149,132">
                  <path
                    d="M143.209,105.968c0,6.25-5.113,11.364-11.363,11.364H18.203c-6.25
                    0-11.363-5.113-11.363-11.364v-86.37c0-6.25,5.113-11.363
                    11.363-11.363h113.643c6.25,0,11.363,5.113,11.363,11.363V105.968z
                    M18.203,17.326c-1.207,0-2.271,1.068-2.271,2.271v86.37c0,1.207,1.065
                    2.271,2.271,2.271h113.643c1.203,0,2.274-1.064
                    2.274-2.271v-86.37c0-1.203-1.071-2.271-2.274-2.271H18.203z
                    M38.661,53.691c-7.529,0-13.641-6.108-13.641-13.635s6.112-13.638,13.641-13.638
                    c7.526,0,13.632,6.111,13.632,13.638S46.188,53.691,38.661,53.691z
                    M125.025,99.15H25.02V85.51l22.73-22.724l11.363,11.36l36.365-36.361l29.547,29.547V99.15z"
                  />
                </svg>
              }
              {
                useCase.placeholders &&
                <div
                  class={itemChildClass}
                />
              }
              {
                item.id === this.props.selectedId && !useCase.icons &&
                <div class="image-navigator-thumbnail-selected"></div>
              }
            </div>
          ))
        }
        {
          model.lastIndexNotVisible(endIndex) &&
          <div class={itemClass} onClick={this.handleIncrement}>
            <div class="navigator-align">
              <div class="image-navigator-control image-navigator-increment">
                <svg viewBox="0,0,1000,837">
                  <path
                    d="M71.9816-0.371452L500.008+527.271L928.018-0.371452L1000+58.0347L500.008+674.371L0+58.0347L71.9816-0.371452Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default ImageNavigator;