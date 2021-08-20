class ProductStyles extends Map {
  constructor(styles) {
    styles.forEach(style => {
      super.set(style.style_id, style)
    });
  }

  getStyle(styleId) {
    const value = super.get(styleId);
    if (!value) {
      console.log(`Style ID ${styleId} not found!`);
    }
    return value;
  }

  getDefaultStyle() {
    const styles = super.values();
    if (!styles) {
      console.log('No styles found!');
      return null;
    }

    for (const style of styles) {
      if (style['default?']) {
        return style;
      }
    }
    console.log('No default found! Using first style...');
    return styles.length > 0 ? styles[0] : null;
  }


  styleIsInStock(styleId) {
    const itemsAvailable = this.getSizesInStock(styleId);
    return itemsAvailable ? Object.keys(itemsAvailable).length > 0 : false;
  }

  sizeIsInStock(sku) {
    return !(!sku.quantity || sku.quantity === 0 || sku.quantity === null);
  }


  getSizesInStock(styleId) {
    const sizesInStock = {};
    const style = this.getStyle(styleId);
    if (!style) {
      return sizesInStock;
    }

    const skus = style.skus;
    console.log('Removing out of stock sizes: ', skus);
    for (const sku in skus) {
      if (this.sizeIsInStock(skus[sku])) {
        sizesInStock[sku] = skus[sku];
      }
    }
    console.log('In stock skus: ', sizesInStock);
    return sizesInStock;
  }

  // getSkusList(styleId) {
  //   return Object.keys(this.getSizesInStock(styleId));
  // }

  // getSizesList(styleId) {
  //   const skusList = this.getSkusList(styleId);
  //   const skus = this.getSizesInStock(styleId);

  //   const sizes = [];
  //   skusList.forEach(sku => {
  //     sizes.push(skus[sku].size);
  //   });
  //   return sizes;
  // }

  getSizesWithSkusInStock(styleId) {
    const skus = this.getSizesInStock(styleId);
    // const skusList = Object.keys(skus);
    const items = [];

    for (const sku of skus) {
      items.push({
        sku: sku,
        size: skus[sku].size
      });
    }

    // skusList.forEach(sku => {
    //   items.push({
    //     sku: sku,
    //     size: skus[sku].size
    //   });
    // });

    // for (let i = 0; i < skus.length; i++) {
    //   items.push({
    //     sku: skus[i],
    //     size: sizes[i]
    //   });
    // }
    return items;
  }

  // getSizesWithSkus(skus, sizes) {
  //   const items = [];
  //   for (let i = 0; i < skus.length; i++) {
  //     items.push({
  //       sku: skus[i],
  //       size: sizes[i]
  //     });
  //   }
  //   return items;
  // }



  maxQuantity(styleId, sku) {
    const style = this.getStyle(styleId);
    if (!style) {
      return 0;
    }
    const skus = style.skus;
    return sku === null ? 0 : skus[sku].quantity;
  }

  maxQuantityCapped(styleId, sku, cap = 15) {
    return Math.min(this.maxQuantity(styleId, sku), cap);
  }

  quantitiesAreAvailable(styleId, sku) {
    return this.maxQuantity(styleId, sku) && this.maxQuantityCapped(styleId, sku) > 0;
  }

  getQuantities() {
    const quantities = [];
    for (let i = 1; i <= maxQuantityCapped; i++) {
      quantities.push(i);
    }
    console.log('quantities available', quantities);
    return quantities;
  }


  getStyleSelectorItems() {
    const styles = super.values;
    if (!styles) {
      console.log('No styles found!');
      return null;
    }

    const styleItems = [];
    styles?.forEach(style => {
      styleItems.push({
        id: style.style_id,
        thumbnail: this.getStyleDefaultPhotoUrl(style.style_id)
      });
    });
    return styleItems;
  }

  getStyleDefaultPhotoUrl(styleId) {
    let url = '';
    const style = this.getStyle(styleId);
    if (style && style.photos.length > 0) {
      url = style.photos[0].thumbnail_url;
    }

    return url;
  }

  getPhotos(styleId) {
    const style = this.getStyle(styleId);
    return style ? style.photos : undefined;
  }

  getThumbnailUrls(styleId) {
    const photos = this.getPhotos(styleId);
    const thumbnails = [];

    if (photos) {
      let counter = 0;
      photos.forEach(photo => {
        thumbnails.push({
          id: counter++,
          url: photo.thumbnail_url
        });
      });
    }

    return thumbnails;
  }
}

export default ProductStyles;