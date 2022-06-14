"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const enzyme_to_json_1 = __importDefault(require("enzyme-to-json"));
const ImageGallery_jsx_1 = __importDefault(require("../../../../../client/src/components/overview/ImageGallery.jsx"));
describe('<ImageGallery />', () => {
    const photos = [
        {
            thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&q=80&h=1152',
            url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&q=80&h=1152'
        },
        {
            thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&q=80&h=1152',
            url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&q=80&h=1152'
        },
        {
            thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&q=80&h=1152',
            url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&q=80&h=1152'
        },
        {
            thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&q=80&h=1152',
            url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&q=80&h=1152'
        },
        {
            thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&q=80&h=1152',
            url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&q=80&h=1152'
        },
    ];
    it('renders without crashing given the required props', () => {
        const props = {
            photos: photos,
            isExpanded: true,
            isZoomed: true
        };
        const wrapper = (0, enzyme_1.shallow)(<ImageGallery_jsx_1.default {...props}/>);
        expect((0, enzyme_to_json_1.default)(wrapper)).toMatchSnapshot();
    });
    it('should have expected default properties classes:', function () {
        const props = {
            photos: photos,
            isExpanded: true,
            isZoomed: true
        };
        const wrapper = (0, enzyme_1.mount)(<ImageGallery_jsx_1.default {...props}/>);
        expect(wrapper.state().selectedPhotoIndex).toEqual(0);
        expect(wrapper.props().photos).toHaveLength(props.photos.length);
        expect(wrapper.props().photos[0].thumbnail_url).toEqual(props.photos[0].thumbnail_url);
        expect(wrapper.props().photos[0].url).toEqual(props.photos[0].url);
        expect(wrapper.props().photos[props.photos.length - 1].thumbnail_url).toEqual(props.photos[props.photos.length - 1].thumbnail_url);
        expect(wrapper.props().photos[props.photos.length - 1].url).toEqual(props.photos[props.photos.length - 1].url);
        expect(wrapper.props().isExpanded).toEqual(true);
        expect(wrapper.props().isZoomed).toEqual(true);
    });
    it('should execute a callback for expand:', function () {
        const mockCallBackZoom = jest.fn();
        const mockCallBackExpand = jest.fn();
        const mockCallBackCollapse = jest.fn();
        const props = {
            onClickZoom: mockCallBackZoom,
            onClickExpand: mockCallBackExpand,
            onClickCollapse: mockCallBackCollapse
        };
        const wrapper = (0, enzyme_1.shallow)(<ImageGallery_jsx_1.default {...props}/>);
        wrapper.find('.image-gallery-expanded-view-toggle').first().simulate('click');
        expect(mockCallBackZoom.mock.calls.length).toEqual(0);
        expect(mockCallBackExpand.mock.calls.length).toEqual(1);
        expect(mockCallBackCollapse.mock.calls.length).toEqual(0);
        wrapper.find('#po-main-image').first().simulate('click');
        expect(mockCallBackZoom.mock.calls.length).toEqual(0);
        expect(mockCallBackExpand.mock.calls.length).toEqual(2);
        expect(mockCallBackCollapse.mock.calls.length).toEqual(0);
    });
    it('should execute a callback for collapse:', function () {
        const mockCallBackZoom = jest.fn();
        const mockCallBackExpand = jest.fn();
        const mockCallBackCollapse = jest.fn();
        const props = {
            isExpanded: true,
            onClickZoom: mockCallBackZoom,
            onClickExpand: mockCallBackExpand,
            onClickCollapse: mockCallBackCollapse
        };
        const wrapper = (0, enzyme_1.shallow)(<ImageGallery_jsx_1.default {...props}/>);
        wrapper.find('.image-gallery-collapsed-view-toggle').first().simulate('click');
        expect(mockCallBackZoom.mock.calls.length).toEqual(0);
        expect(mockCallBackExpand.mock.calls.length).toEqual(0);
        expect(mockCallBackCollapse.mock.calls.length).toEqual(1);
    });
    it('should execute a callback for zoom:', function () {
        const mockCallBackZoom = jest.fn();
        const mockCallBackExpand = jest.fn();
        const mockCallBackCollapse = jest.fn();
        const props = {
            isExpanded: true,
            isZoomed: true,
            onClickZoom: mockCallBackZoom,
            onClickExpand: mockCallBackExpand,
            onClickCollapse: mockCallBackCollapse
        };
        const wrapper = (0, enzyme_1.mount)(<ImageGallery_jsx_1.default {...props}/>);
        wrapper.find('#po-main-image').first().simulate('click');
        expect(mockCallBackZoom.mock.calls.length).toEqual(1);
        expect(mockCallBackExpand.mock.calls.length).toEqual(0);
        expect(mockCallBackCollapse.mock.calls.length).toEqual(0);
    });
});
