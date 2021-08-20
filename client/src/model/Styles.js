import ProductStyles from './ProductStyles.js';

class Styles extends Map {
  set(key, value) {
    super.set(key, new ProductStyles(value));
  }

  getStyle(productId, styleId) {
    return this.getStyles(productId).get(styleId);
  }

  // getStyles(productId) {
  //   return this.get(productId);
  // }

  // setStyles(productId, styles) {
  //   // const stylesMap = new Map();
  //   // styles.forEach(style => {
  //   //   styles.set(style.style_id, style)
  //   // });
  //   // super.set(productId, stylesMap);

  //   this.set(productId, styles);
  // }

  // getDefaultStyle(productId) {
  //   const styles = this.getStyles(productId);
  //   for (const style of styles) {
  //     if (style['default?']) {
  //       return style;
  //     }
  //   }
  //   console.log('No default found! Using first style...');
  //   return styles.length > 0 ? styles[0] : null;
  // }

  // getStyleById(id, styles) {
  //   for (const style of styles) {
  //     if (style.style_id === id) {
  //       return style;
  //     }
  //   }
  //   console.log('NO Matching style found!');
  //   return;
  // }

  // getSizesInStock(productId, styleId) {
  //   const style = this.getStyle(productId, styleId);
  //   const sizes = style.skus;
  //   const isInStock = sku => {
  //     return !(!sku.quantity || sku.quantity === 0 || sku.quantity === null);
  //   };

  //   console.log('Removing out of stock sizes: ', sizes);
  //   const sizesInStock = {};
  //   for (const sku in sizes) {
  //     if (isInStock(sizes[sku])) {
  //       sizesInStock[sku] = sizes[sku];
  //     }
  //   }
  //   console.log('In stock skus: ', sizesInStock);
  //   return sizesInStock;
  // }



  // getStyleSelectorItems(productId) {
  //   const styles = this.getStyles(productId);
  //   const styleItems = [];
  //   styles?.forEach(style => {
  //     styleItems.push({
  //       id: style.style_id,
  //       thumbnail: this.getStyleDefaultPhotoUrl(style)
  //     });
  //   });
  //   return styleItems;
  // }

  // getStyleDefaultPhotoUrl(productId, styleId) {
  //   const style = this.getStyle(productId, styleId);
  //   if (style.photos.length === 0) {
  //     return '';
  //   } else {
  //     return style.photos[0].thumbnail_url;
  //   }
  // }

  // getImages(productId, styleId) {
  //   // const styles = this.getStyles(productId);
  //   const style = this.getStyle(productId, styleId);
  //   return style ? style.photos : undefined;
  //   // for (let style of styles) {
  //   //   if (style.style_id === styleId) {
  //   //     return style.photos;
  //   //   }
  //   // }
  // }

  // getPhotoThumbnailUrls() {
  //   const thumbnails = [];
  //   let counter = 0;
  //   this.photos?.forEach(photo => {
  //     thumbnails.push({
  //       id: counter++,
  //       url: photo.thumbnail_url
  //     });
  //   });
  //   return thumbnails;
  // }
}

export default Styles;