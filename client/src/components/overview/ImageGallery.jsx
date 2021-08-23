import React from 'react';
import POClickTracker from '../trackers/POClickTracker';
import ZoomedImageController from './ZoomedImageController.js';
import ScrollingArrows from '../shared/ScrollingArrows';
import ImageNavigator from './ImageNavigator';
import ImageGalleryModel from './ImageGalleryModel.js';
import ZoomedImageController from './ZoomedImageController.js';
import Image from '../shared/Image';
import './imageGallery.css';

class ImageGallery extends React.Component {
  constructor(props) { // = {
  //   photos: [],
  //   isExpanded: false,
  //   isZoomed: false,
  //   onClickExpand,
  //   onClickCollapse,
  //   onClickZoom
  // }) {
    super(props);

    this.imgId = 'po-image';
    this.containerId = 'po-main-image';
    this.model = null;
    this.controller = new ZoomedImageController(this.containerId, this.imgId);

    this.state = {
      selectedPhotoIndex: 0
    };

    this.updateIndex = this.updateIndex.bind(this);
  }

  componentDidUpdate() {
    if (this.model.isZoomed) {
      console.log('ImageGallery zoom: setup');
      this.controller.setup();
    } else if (this.model.isExpanded) {
      console.log('ImageGallery zoom: teardown');
      this.controller.teardown();
    }
  }

  updateIndex(index) {
    console.log('Updating selectedPhotoIndex: ', index);
    this.setState({
      selectedPhotoIndex: index
    });
  }

  render() {
    console.log('Rendering image gallery');

    const currentIndex = this.state.selectedPhotoIndex;
    console.log('currentIndex', currentIndex);

    this.model = new ImageGalleryModel({
      photos: this.props?.photos,
      isExpanded: this.props?.isExpanded,
      isZoomed: this.props?.isZoomed
    }, currentIndex);
    const model = this.model;
    const thumbnails = model.getPhotoThumbnailUrls();
    console.log('ImageGallery: photos', this.props?.photos);
    console.log('ImageGallery: thumbnails', thumbnails);
    const viewId = model.getViewId();
    const attributes = model.getAttributes();
    const photoUrl = model.getSelectedPhoto();
    const handleImageClick = model.isExpanded ? this.props.onClickZoom : this.props.onClickExpand;

    return (
      <div id="po-image-gallery" { ...attributes }>
        <div id={ viewId }>
          <div class="row">
            {
              !model.isZoomed &&
              <POClickTracker eventName="clickTracker" moduleName="Product Overview">
                <ImageNavigator
                  onClick={ this.updateIndex }
                  thumbnails={ thumbnails }
                  selectedId={ currentIndex }
                  length={ thumbnails.length }
                  useIcons={ model.isExpanded }
                />
              </POClickTracker>
            }
            <div class="column">
              {
                !model.isExpanded &&
                <POClickTracker eventName="clickTracker" moduleName="Product Overview">
                  <div class="image-gallery-expanded-view-toggle" onClick={ this.props.onClickExpand }>
                    <svg viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M1 1v6h2V3h4V1H1zm2 12H1v6h6v-2H3v-4zm14 4h-4v2h6v-6h-2v4zm0-16h-4v2h4v4h2V1h-2z"
                      />
                    </svg>
                  </div>
                </POClickTracker>
              }
              {
                model.isExpanded &&
                <POClickTracker eventName="clickTracker" moduleName="Product Overview">
                  <div class="image-gallery-collapsed-view-toggle" onClick={ this.props.onClickCollapse }>
                    <svg viewBox="0,0,999,937">
                      <path
                        d="M687.572+406.573L968.56+406.573C986.292+406.573+999.53+392.585+999.53+374.883C999.53+357.15+986.292+344.13+968.56+344.161L718.795+344.161L718.795+93.8959C718.795+76.1631+705.308+62.676+687.575+62.676C669.842+62.676+656.355+76.1631+656.355+93.8959L656.355+374.883C656.355+374.976+656.386+375.039+656.386+375.101C656.386+375.194+656.355+375.257+656.355+375.35C656.353+392.771+670.151+406.604+687.572+406.573Z"
                      />
                      <path
                        d="M312.176+62.9251C294.474+62.9251+281.454+76.1942+281.454+93.8959L281.454+343.66L31.2199+343.66C13.4871+343.66+0+357.147+0+374.88C0+392.613+13.4871+406.1+31.2199+406.1L312.207+406.1C312.3+406.1+312.363+406.069+312.425+406.069C312.518+406.069+312.581+406.1+312.674+406.1C330.095+406.1+343.894+392.302+343.894+374.88L343.894+93.8959C343.897+76.1942+329.909+62.9563+312.176+62.9251Z"
                      />
                      <path
                        d="M312.425+593.427L31.4405+593.427C13.7077+593.459+0.469725+607.415+0.469725+625.148C0.469725+642.881+13.7077+655.901+31.4405+655.87L281.205+655.87L281.205+906.104C281.205+923.837+294.692+937.324+312.425+937.324C330.158+937.324+343.645+923.837+343.645+906.104L343.645+625.117C343.645+625.024+343.614+624.961+343.614+624.899C343.614+624.806+343.645+624.743+343.645+624.65C343.647+607.226+329.846+593.427+312.425+593.427Z"
                      />
                      <path
                        d="M968.777+593.427L687.793+593.427C687.7+593.427+687.637+593.459+687.575+593.459C687.482+593.459+687.419+593.427+687.326+593.427C669.905+593.427+656.106+607.226+656.106+624.647L656.106+905.634C656.106+923.367+670.094+936.574+687.827+936.605C705.529+936.636+718.549+923.367+718.549+905.666L718.549+655.901L968.777+655.901C986.51+655.901+999.997+642.414+999.997+624.681C999.997+606.948+986.513+593.459+968.777+593.427Z"
                      />
                    </svg>
                  </div>
                </POClickTracker>
              }
              {
                !model.isZoomed &&
                <POClickTracker eventName="clickTracker" moduleName="Product Overview">
                  <ScrollingArrows
                    callback={ this.updateIndex }
                    maxIndex={ model.photos.length - 1 }
                    stem={ true }
                  />
                </POClickTracker>
              }
            </div>
          </div>
          <POClickTracker eventName="clickTracker" moduleName="Product Overview">
            <div id={ this.containerId } onClick={ handleImageClick }>
               <Image
                imageType="banner"
                img={{
                  id: this.imgId,
                  src: photoUrl,
                  alt: "selected style selected image"
                }}
              />
            </div>
          </POClickTracker>
        </div>
      </div>
    );
  }
}

export default ImageGallery;