import ImageGalleryModel from '../../../../../client/src/components/overview/ImageGalleryModel.js';

describe('<ImageGalleryModel />', () => {
  const photos = [
    {// eslint-disable-next-line
      thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
      url: 'https://images.unsplash.com/photo-1501088430049-71…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
    },
    {// eslint-disable-next-line
      thumbnail_url: 'https://images.unsplash.com/photo-1534011546717-40…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
      url: 'https://images.unsplash.com/photo-1534011546717-40…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80'
    },
    {// eslint-disable-next-line
      thumbnail_url: 'https://images.unsplash.com/photo-1549831243-a69a0…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
      url: 'https://images.unsplash.com/photo-1549831243-a69a0…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80'
    },
    {// eslint-disable-next-line
      thumbnail_url: 'https://images.unsplash.com/photo-1527522883525-97…2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      url: 'https://images.unsplash.com/photo-1527522883525-97…2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {// eslint-disable-next-line
      thumbnail_url: 'https://images.unsplash.com/photo-1556648202-80e75…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
      url: 'https://images.unsplash.com/photo-1556648202-80e75…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
    }
  ];

  it('should initialize expected properties:', function () {
    const props = {
      photos: photos,
      isExpanded: true,
      isZoomed: true};
    const selectedPhotoIndex = 2;

    const model = new ImageGalleryModel(props, selectedPhotoIndex);
    expect(model.photos.length).toEqual(props.photos.length);
    expect(model.photos[0].thumbnail_url).toEqual(props.photos[0].thumbnail_url);
    expect(model.photos[0].url).toEqual(props.photos[0].url);
    expect(model.photos[model.photos.length - 1].thumbnail_url).toEqual(props.photos[props.photos.length - 1].thumbnail_url);
    expect(model.photos[model.photos.length - 1].url).toEqual(props.photos[props.photos.length - 1].url);
    expect(model.isExpanded).toEqual(props.isExpanded);
    expect(model.isZoomed).toEqual(props.isZoomed);
    expect(model.selectedPhotoIndex).toEqual(selectedPhotoIndex);
  });

  it('getPhotoThumbnailUrls should return a list of only the thumbnail URLs:', function () {
    const props = {
      photos: photos
    };
    const selectedPhotoIndex = 2;

    const model = new ImageGalleryModel(props, selectedPhotoIndex);
    const thumbnails = model.getPhotoThumbnailUrls();
    expect(thumbnails.length).toEqual(props.photos.length);
    expect(thumbnails[0].id).toEqual(0);
    expect(thumbnails[0].url).toEqual(props.photos[0].thumbnail_url);
    expect(thumbnails[thumbnails.length - 1].id).toEqual(thumbnails.length - 1);
    expect(thumbnails[thumbnails.length - 1].url).toEqual(props.photos[props.photos.length - 1].thumbnail_url);
  });

  it('getSelectedPhoto should return the URL for the selected photo:', function () {
    const props = {
      photos: photos
    };
    const selectedPhotoIndex = 2;

    const model = new ImageGalleryModel(props, selectedPhotoIndex);
    expect(model.getSelectedPhoto()).toEqual(props.photos[selectedPhotoIndex].url);
  });

  it('getPhotoUrl should return the URL for the photo at the provided index:', function () {
    const props = {
      photos: photos
    };
    const selectedPhotoIndex = 2;

    const model = new ImageGalleryModel(props, selectedPhotoIndex);
    expect(model.getPhotoUrl(3)).toEqual(props.photos[3].url);
  });

  it('getViewId should return collapsed if not expanded:', function () {
    let props = {};
    const selectedPhotoIndex = 2;

    let model = new ImageGalleryModel(props, selectedPhotoIndex);
    expect(model.getViewId()).toEqual('collapsed-view');

    props = {
      photos: photos,
      isExpanded: false,
      isZoomed: false
    };
    model = new ImageGalleryModel(props, selectedPhotoIndex);
    expect(model.getViewId()).toEqual('collapsed-view');
  });

  it('getViewId should return expanded if not collapsed or zoomed:', function () {
    let props = {
      isExpanded: true
    };
    const selectedPhotoIndex = 2;

    let model = new ImageGalleryModel(props, selectedPhotoIndex);
    expect(model.getViewId()).toEqual('expanded-view');

    props = {
      photos: photos,
      isExpanded: false,
      isZoomed: false
    };
    model = new ImageGalleryModel(props, selectedPhotoIndex);
    expect(model.getViewId()).toEqual('collapsed-view');
  });

  it('getViewId should return zoomed only if expanded and zoomed:', function () {
    let props = {
      isExpanded: true,
      isZoomed: true
    };
    const selectedPhotoIndex = 2;

    let model = new ImageGalleryModel(props, selectedPhotoIndex);
    expect(model.getViewId()).toEqual('zoomed-view');

    props = {
      isExpanded: false,
      isZoomed: true
    };
    model = new ImageGalleryModel(props, selectedPhotoIndex);
    expect(model.getViewId()).toEqual('collapsed-view');
  });

  it('getAttributes should return empty if not expanded:', function () {
    let props = {
      isExpanded: false,
      isZoomed: false
    };
    const selectedPhotoIndex = 2;

    let model = new ImageGalleryModel(props, selectedPhotoIndex);
    expect(model.getAttributes()['className']).toEqual(undefined);

    props = {};
    model = new ImageGalleryModel(props, selectedPhotoIndex);
    expect(model.getAttributes()['className']).toEqual(undefined);
  });

  it('getAttributes should return expanded class if expanded:', function () {
    let props = {
      isExpanded: true,
      isZoomed: true
    };
    const selectedPhotoIndex = 2;

    let model = new ImageGalleryModel(props, selectedPhotoIndex);
    expect(model.getAttributes()['className']).toEqual('expanded');

    props = {
      isExpanded: true,
      isZoomed: false
    };
    model = new ImageGalleryModel(props, selectedPhotoIndex);
    expect(model.getAttributes()['className']).toEqual('expanded');
  });
});