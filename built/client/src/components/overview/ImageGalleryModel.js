"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ImageGalleryModel {
    constructor({ photos = [], isExpanded = false, isZoomed = false }, selectedPhotoIndex = 0) {
        this.photos = photos;
        this.isExpanded = isExpanded;
        this.isZoomed = isZoomed;
        this.selectedPhotoIndex = selectedPhotoIndex;
    }
    getPhotoThumbnailUrls() {
        var _a;
        const thumbnails = [];
        let counter = 0;
        (_a = this.photos) === null || _a === void 0 ? void 0 : _a.forEach(photo => {
            thumbnails.push({
                id: counter++,
                url: photo.thumbnail_url
            });
        });
        return thumbnails;
    }
    getSelectedPhoto() {
        return this.getPhotoUrl(this.selectedPhotoIndex);
    }
    getPhotoUrl(index) {
        var _a;
        if (!this.photos) {
            return '';
        }
        return (_a = this.photos[index]) === null || _a === void 0 ? void 0 : _a.url;
    }
    getViewId() {
        if (this.isExpanded) {
            return this.isZoomed ? 'image-gallery-zoomed-view' : 'image-gallery-expanded-view';
        }
        else {
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
exports.default = ImageGalleryModel;
