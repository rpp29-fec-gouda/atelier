import React from 'react';

class Image extends React.Component {
  static placeHolderCount = 0;

  static defaultProps = {
    imageType: 'thumbnail'
  }

  constructor(props) {
    super(props);

    console.log('img props:', props.img);

    // props:
    // img: { }
      // src={item.thumbnail}
      // alt="style default thumbnail"
      // id={item.thumbnail}
      // class="po-style po-style-selector-image"
      // data-style-id={item.id}
      // onClick={handleClick}
      // key={itemKey++}
    // imageType

    this.placeholderClassName = 'image-placeholder-' + Image.placeHolderCount++;
    console.log(`%cPlaceHolderClassName ${this.placeholderClassName }`, 'color: green');
    this.imageTypes = {
      banner: 80,
      card: 70,
      thumbnail: 100
    };

    this.getAttributes = this.getAttributes.bind(this);
    this.updateImageUrl = this.updateImageUrl.bind(this);

    this.state = {
      isLoaded: false,
      url: props.img.src
    };
  }

  componentDidMount() {
    if (!this.state.isLoaded) {
      this.updateImageUrl();
    }
  }

  componentDidUpdate() {
    if (!this.state.isLoaded) {
      this.updateImageUrl();
    }
  }

  updateImageUrl() {
    const prepareUrlParams = (url, param) => {
      if (url.includes(`&${param}=`)) {
        url = url.replace(`&${param}=`, '');
        url += '&';
      } else if (url.includes(`?${param}=`)) {
        url = url.replace(`?${param}=`, '?');
        if (url.includes('?&')) {
          url = url.replace('?&', '?');
          url += '&';
        }
      }
      return url;
    };

    const getInnerHeight = (element) => {
      console.log('ELEMENT: ', element);
      const computed = getComputedStyle(element);
      const padding = parseInt(computed.paddingTop) + parseInt(computed.paddingBottom);

      return element.clientHeight - padding
    };

    const getInnerWidth = (element) => {
      console.log('ELEMENT: ', element);
      const computed = getComputedStyle(element);
      const padding = parseInt(computed.paddingLeft) + parseInt(computed.paddingRight);

      return element.clientWidth - padding
    };

    const imgUrl = this.props.img.src;
    console.log('%cOld Url', 'color: green');
    console.log(imgUrl);

    const placeholder = document.getElementsByClassName(this.placeholderClassName);
    console.log('PLACEHOLDER: ', placeholder);
    console.log('PLACEHOLDERLENGTH: ', placeholder.length);
    if (!placeholder || placeholder.length === 0) {
      console.log('%cNo placeholder found!', 'color: red');
      return;
    }
    if (placeholder.length > 1) {
      console.log('%cMultiple placeholders found!', 'color: red');
      return;
    }
    const width = 2 * getInnerWidth(placeholder[0]);
    console.log('Original width:', width);
    const height = 2 * getInnerHeight(placeholder[0]);
    console.log('Original height:', height);
    if (!width && !height) {
      !width && console.log('%cPlaceholder does not have a width!', 'color: red');
      !height && console.log('%cPlaceholder does not have a height!', 'color: red');
      return;
    }

    let urlUpdatedSize = imgUrl;
    if (height && height > width) {
      if (imgUrl.includes('?h=') || imgUrl.includes('&h=')) {
        console.log('Replacing height');
        urlUpdatedSize = imgUrl.replace(/(h=).*?(&|$)/,'$1' + height + '$2');
      } else {
        console.log('Removing width');
        urlUpdatedSize = urlUpdatedSize.replace(/(w=).*?(&|$)/,'$1' + '' + '$2');
        urlUpdatedSize = prepareUrlParams(urlUpdatedSize, 'w');
        console.log(`adding Height h=${height}`);

        urlUpdatedSize += `h=${height}`;
      }
    } else if (width) {
      if (imgUrl.includes('?w=') || imgUrl.includes('&w=')) {
        console.log('Replacing width');
        urlUpdatedSize = imgUrl.replace(/(w=).*?(&|$)/,'$1' + width + '$2');
      } else {
        console.log('Removing height');
        urlUpdatedSize = urlUpdatedSize.replace(/(h=).*?(&|$)/,'$1' + '' + '$2');
        urlUpdatedSize = prepareUrlParams(urlUpdatedSize, 'h');
        console.log(`adding Width w=${width}`);
        urlUpdatedSize += `w=${width}`;
      }
    }
    console.log(`Updated URL: ${urlUpdatedSize}`)

    const quality = this.getQuality(this.props.imageType);
    const urlUpdatedWidthAndQuality = urlUpdatedSize.replace(/(q=).*?(&|$)/,'$1' + quality + '$2');

    console.log('%c🌋New Url', 'color: green');
    console.log(urlUpdatedWidthAndQuality);
    this.setState({
      isLoaded: true,
      url: urlUpdatedWidthAndQuality
    });
  }

  getQuality(imageType) {
    let quality = this.imageTypes[imageType];
    return quality ? quality : 80;
  }

  getAttributes(isLoaded, attributes, url) {
    let newAttributes = {};
    if (isLoaded) {
      newAttributes = attributes;
      newAttributes.src = url;
    } else {
      newAttributes.className = this.placeholderClassName;

      if (attributes.className) {
        newAttributes.className += ' ' + attributes.className;
      }
      if (attributes.id) {
        newAttributes.id = attributes.id;
      }
    }
    console.log('%cGetting Attributes!', 'color: green');
    console.log(newAttributes);
    return newAttributes;
  }

  render() {
    console.log('%cRendering Image!', 'color: green');
    const isLoaded = this.state.isLoaded;
    const url = this.state.url;
    const attributes = this.props.img;

    return (
      <React.Fragment>
        {
          isLoaded ?
          (
            <img { ...this.getAttributes(isLoaded, attributes, url) } />
          ) : (
            <div { ...this.getAttributes(isLoaded, attributes) }></div>
          )
        }
      </React.Fragment>
    );
  }
}



export default Image;