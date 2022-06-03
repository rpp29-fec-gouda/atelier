import React from 'react';

class Image extends React.Component {
  static placeHolderCount = 0;

  static defaultProps = {
    imageType: 'thumbnail'
  }

  constructor(props) {
    super(props);
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
    this.prevPlaceholderDimensions = undefined;
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

  shouldComponentUpdate(nextProps) {
    const prevUrl = this.props.img.src.split('?')[0];
    const nextUrl = nextProps.img.src.split('?')[0];
    if (prevUrl && nextUrl && prevUrl !== nextUrl) {
      this.updateImageUrl(nextProps.img.src);
    }
    return true;
  }

  componentDidUpdate() {
    if (!this.state.isLoaded) {
      this.updateImageUrl();
    }
  }

  updateImageUrl(nextImgSrc = undefined) {
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
      const computed = getComputedStyle(element);
      const padding = parseInt(computed.paddingTop) + parseInt(computed.paddingBottom);

      return element.clientHeight - padding
    };

    const getInnerWidth = (element) => {
      const computed = getComputedStyle(element);
      const padding = parseInt(computed.paddingLeft) + parseInt(computed.paddingRight);

      return element.clientWidth - padding
    };

    const getPlaceholderDimensions = () => {
      const placeholder = document.getElementsByClassName(this.placeholderClassName);
      if (!placeholder || placeholder.length === 0) {
        console.log('%cNo placeholder found! Using previous dimensions.', 'color: yellow');
        return this.prevPlaceholderDimensions;
      }
      if (placeholder.length > 1) {
        console.log('%cMultiple placeholders found!', 'color: red');
        return;
      }

      const width = 2 * getInnerWidth(placeholder[0]);
      const height = 2 * getInnerHeight(placeholder[0]);
      if (!width && !height) {
        !width && console.log('%cPlaceholder does not have a width!', 'color: red');
        !height && console.log('%cPlaceholder does not have a height!', 'color: red');
        return;
      } else {
        this.prevPlaceholderDimensions = { width, height };
        return { width, height };
      }
    };

    const updateSize = (urlUpdatedSize, placeholderWidth, placeholderHeight) => {
      if (placeholderHeight && placeholderHeight > placeholderWidth) {
        if (imgUrl.includes('?h=') || imgUrl.includes('&h=')) {
          console.log('Replacing height');
          urlUpdatedSize = imgUrl.replace(/(h=).*?(&|$)/,'$1' + placeholderHeight + '$2');
        } else {
          console.log('Removing width');
          urlUpdatedSize = urlUpdatedSize.replace(/(w=).*?(&|$)/,'$1' + '' + '$2');
          urlUpdatedSize = prepareUrlParams(urlUpdatedSize, 'w');
          console.log(`adding Height h=${placeholderHeight}`);

          urlUpdatedSize += `h=${placeholderHeight}`;
        }
      } else if (placeholderWidth) {
        if (imgUrl.includes('?w=') || imgUrl.includes('&w=')) {
          console.log('Replacing width');
          urlUpdatedSize = imgUrl.replace(/(w=).*?(&|$)/,'$1' + placeholderWidth + '$2');
        } else {
          console.log('Removing height');
          urlUpdatedSize = urlUpdatedSize.replace(/(h=).*?(&|$)/,'$1' + '' + '$2');
          urlUpdatedSize = prepareUrlParams(urlUpdatedSize, 'h');
          console.log(`adding Width w=${placeholderWidth}`);
          urlUpdatedSize += `w=${placeholderWidth}`;
        }
      }
      return urlUpdatedSize;
    };

    const imgUrl = nextImgSrc ? nextImgSrc : this.props.img.src;
    if (!imgUrl) {
      this.setState({
        isLoaded: false
      });
      return;
    }
    console.log('%cOld Url', 'color: green');
    console.log(imgUrl);

    const placeholderDimensions = getPlaceholderDimensions();
    if (!placeholderDimensions) {
      return;
    }

    let urlUpdatedSize = updateSize(imgUrl, placeholderDimensions.width, placeholderDimensions.height);
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