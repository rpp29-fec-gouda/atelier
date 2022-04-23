class ImageGalleryModel {
  constructor({
    photos = [],
    isExpanded = false,
    isZoomed = false
  },
  selectedPhotoIndex = 0) {
    this.photos = photos;
    this.isExpanded = isExpanded;
    this.isZoomed = isZoomed;
    this.selectedPhotoIndex = selectedPhotoIndex;
  }

  getPhotoThumbnailUrls() {
    const thumbnails = [];
    let counter = 0;
    this.photos?.forEach(photo => {
      thumbnails.push({
        id: counter++,
        url: photo.thumbnail_url
      });
    });
    return thumbnails;
  }

  getSelectedPhoto() {
    console.log('getSelectedPhoto index: ', this.selectedPhotoIndex);
    return this.getPhotoUrl(this.selectedPhotoIndex);
  }

  getPhotoUrl(index) {
    if (!this.photos) {
      return '';
    }
    console.log('Photo URL: ', this.photos[index]?.url);
    return this.photos[index]?.url;
  }

  getViewId() {
    if (this.isExpanded) {
      return this.isZoomed ? 'image-gallery-zoomed-view' : 'image-gallery-expanded-view';
    } else {
      return 'image-gallery-collapsed-view';
    }
  }

  getAttributes() {
    const attributes = {};
    if (this.isExpanded) {
      attributes['className'] = 'expanded';
    }
    return attributes;
  }
}

export default ImageGalleryModel;