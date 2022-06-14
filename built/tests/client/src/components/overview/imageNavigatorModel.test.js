"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ImageNavigatorModel_js_1 = __importDefault(require("../../../../../client/src/components/overview/ImageNavigatorModel.js"));
describe('<ImageNavigatorModel />', () => {
    it('firstIndexNotVisible should return true if displayed range does not include index:', function () {
        const props = {
            thumbnails: undefined,
            useIcons: true,
            length: 8,
            maxItems: 4,
            startIndex: 0
        };
        const model = new ImageNavigatorModel_js_1.default(props);
        model.incrementIndex();
        expect(model.firstIndexNotVisible()).toEqual(true);
    });
    it('firstIndexNotVisible should return false if displayed range includes index:', function () {
        const props = {
            thumbnails: undefined,
            useIcons: true,
            length: 8,
            maxItems: 4,
            startIndex: 0
        };
        const model = new ImageNavigatorModel_js_1.default(props);
        expect(model.firstIndexNotVisible()).toEqual(false);
    });
    it('lastIndexNotVisible should return true if displayed range does not include index:', function () {
        const props = {
            thumbnails: undefined,
            useIcons: true,
            length: 9,
            maxItems: 7,
            startIndex: 0
        };
        const model = new ImageNavigatorModel_js_1.default(props);
        expect(model.lastIndexNotVisible()).toEqual(true);
    });
    it('lastIndexNotVisible should return false if displayed range includes index:', function () {
        const props = {
            thumbnails: undefined,
            useIcons: true,
            length: 9,
            maxItems: 7,
            startIndex: 0
        };
        const model = new ImageNavigatorModel_js_1.default(props);
        expect(model.lastIndexNotVisible()).toEqual(true);
        model.incrementIndex();
        expect(model.lastIndexNotVisible()).toEqual(false);
    });
    it('decrementIndex should decrement index & return true if min displayed index is not 0:', function () {
        const props = {
            thumbnails: undefined,
            useIcons: true,
            length: 8,
            maxItems: 4,
            startIndex: 0
        };
        const model = new ImageNavigatorModel_js_1.default(props);
        expect(model.startIndex).toEqual(0);
        expect(model.endIndex).toEqual(3);
        expect(model.incrementIndex()).toEqual(true);
        expect(model.startIndex).toEqual(4);
        expect(model.endIndex).toEqual(7);
        expect(model.decrementIndex()).toEqual(true);
        expect(model.startIndex).toEqual(0);
        expect(model.endIndex).toEqual(3);
    });
    it('decrementIndex should return false if min displayed index is 0:', function () {
        const props = {
            thumbnails: undefined,
            useIcons: true,
            length: 8,
            maxItems: 4,
            startIndex: 0
        };
        const model = new ImageNavigatorModel_js_1.default(props);
        expect(model.startIndex).toEqual(0);
        expect(model.endIndex).toEqual(3);
        expect(model.incrementIndex()).toEqual(true);
        expect(model.startIndex).toEqual(4);
        expect(model.endIndex).toEqual(7);
        expect(model.decrementIndex()).toEqual(true);
        expect(model.startIndex).toEqual(0);
        expect(model.endIndex).toEqual(3);
        expect(model.decrementIndex()).toEqual(false);
    });
    it('incrementIndex should increment index & return true if max displayed index is not the max index:', function () {
        const props = {
            thumbnails: undefined,
            useIcons: true,
            length: 8,
            maxItems: 4,
            startIndex: 0
        };
        const model = new ImageNavigatorModel_js_1.default(props);
        expect(model.startIndex).toEqual(0);
        expect(model.endIndex).toEqual(3);
        expect(model.incrementIndex()).toEqual(true);
        expect(model.startIndex).toEqual(4);
        expect(model.endIndex).toEqual(7);
    });
    it('incrementIndex should return false if max displayed index is the max index:', function () {
        const props = {
            thumbnails: undefined,
            useIcons: true,
            length: 8,
            maxItems: 4,
            startIndex: 0
        };
        const model = new ImageNavigatorModel_js_1.default(props);
        expect(model.startIndex).toEqual(0);
        expect(model.endIndex).toEqual(3);
        expect(model.incrementIndex()).toEqual(true);
        expect(model.startIndex).toEqual(4);
        expect(model.endIndex).toEqual(7);
        expect(model.incrementIndex()).toEqual(false);
    });
});
describe('<ImageNavigatorModel /> image-navigator-thumbnail', () => {
    const thumbnails = [
        {
            id: 0,
            url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'
        },
        {
            id: 1,
            url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'
        },
        {
            id: 2,
            url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'
        },
        {
            id: 3,
            url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'
        },
        {
            id: 4,
            url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'
        },
        {
            id: 5,
            url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'
        },
        {
            id: 6,
            url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'
        },
        {
            id: 7,
            url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'
        },
        {
            id: 8,
            url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'
        },
    ];
    it('should initialize expected properties:', function () {
        let props = {
            thumbnails: thumbnails
        };
        let model = new ImageNavigatorModel_js_1.default(props);
        expect(model.thumbnails.length).toEqual(thumbnails.length);
        expect(model.useIcons).toEqual(false);
        expect(model.startIndex).toEqual(0);
        expect(model.maxItems).toEqual(7);
        expect(model.endIndex).toEqual(6);
        expect(model.length).toEqual(thumbnails.length);
        props = {
            thumbnails: [],
            length: 2,
            maxItems: 4
        };
        model = new ImageNavigatorModel_js_1.default(props);
        expect(model.length).toEqual(props.length);
        props = {
            thumbnails: [],
            maxItems: 4
        };
        model = new ImageNavigatorModel_js_1.default(props);
        expect(model.length).toEqual(props.maxItems);
    });
    it('usePlaceholders should return false:', function () {
        const props = {
            thumbnails: thumbnails
        };
        const model = new ImageNavigatorModel_js_1.default(props);
        expect(model.usePlaceholders()).toEqual(false);
    });
    it('getUseCase should only have thumbnails selected:', function () {
        const props = {
            thumbnails: thumbnails
        };
        const model = new ImageNavigatorModel_js_1.default(props);
        expect(model.getUseCase().thumbnails).toEqual(true);
        expect(model.getUseCase().icons).toEqual(false);
        expect(model.getUseCase().placeholders).toEqual(false);
    });
    it('getItemChildClass should return \'image-navigator-thumbnail\':', function () {
        const props = {
            thumbnails: thumbnails
        };
        const model = new ImageNavigatorModel_js_1.default(props);
        expect(model.getItemChildClass()).toEqual('image-navigator-thumbnail');
    });
    it('getItemParentClass should return base class case:', function () {
        const props = {
            thumbnails: thumbnails
        };
        const model = new ImageNavigatorModel_js_1.default(props);
        expect(model.getItemParentClass()).toEqual('image-navigator-item');
    });
    it('getItemUrls should return thumbnails subset:', function () {
        const props = {
            thumbnails: thumbnails,
            maxItems: 4
        };
        const model = new ImageNavigatorModel_js_1.default(props);
        let subset = model.getThumbnailsSubset();
        expect(subset.length).toEqual(props.maxItems);
        expect(subset[0].id).toEqual(thumbnails[0].id);
        expect(subset[0].url).toEqual(thumbnails[0].url);
        expect(subset[props.maxItems - 1].id).toEqual(thumbnails[props.maxItems - 1].id);
        expect(subset[props.maxItems - 1].url).toEqual(thumbnails[props.maxItems - 1].url);
        model.incrementIndex();
        subset = model.getThumbnailsSubset();
        expect(subset.length).toEqual(props.maxItems);
        expect(subset[0].id).toEqual(thumbnails[props.maxItems].id);
        expect(subset[0].url).toEqual(thumbnails[props.maxItems].url);
        expect(subset[props.maxItems - 1].id).toEqual(thumbnails[2 * props.maxItems - 1].id);
        expect(subset[props.maxItems - 1].url).toEqual(thumbnails[2 * props.maxItems - 1].url);
    });
    it('getThumbnailsSubset should return all thumbnails if not overflowed:', function () {
        const props = {
            thumbnails: thumbnails,
            maxItems: thumbnails.length
        };
        const model = new ImageNavigatorModel_js_1.default(props);
        let subset = model.getThumbnailsSubset();
        expect(subset.length).toEqual(props.thumbnails.length);
        expect(subset[0].id).toEqual(thumbnails[0].id);
        expect(subset[0].url).toEqual(thumbnails[0].url);
        expect(subset[props.maxItems - 1].id).toEqual(thumbnails[props.maxItems - 1].id);
        expect(subset[props.maxItems - 1].url).toEqual(thumbnails[props.maxItems - 1].url);
        model.incrementIndex();
        subset = model.getThumbnailsSubset();
        expect(subset[0].id).toEqual(thumbnails[0].id);
        expect(subset[0].url).toEqual(thumbnails[0].url);
        expect(subset[props.maxItems - 1].id).toEqual(thumbnails[props.maxItems - 1].id);
        expect(subset[props.maxItems - 1].url).toEqual(thumbnails[props.maxItems - 1].url);
    });
    it('getThumbnailsSubset should return a subset of thumbnails if overflowed limited to the max # of items:', function () {
        const props = {
            thumbnails: thumbnails,
            maxItems: 4
        };
        const model = new ImageNavigatorModel_js_1.default(props);
        let subset = model.getThumbnailsSubset();
        expect(subset.length).toEqual(props.maxItems);
        expect(subset[0].id).toEqual(thumbnails[0].id);
        expect(subset[0].url).toEqual(thumbnails[0].url);
        expect(subset[props.maxItems - 1].id).toEqual(thumbnails[props.maxItems - 1].id);
        expect(subset[props.maxItems - 1].url).toEqual(thumbnails[props.maxItems - 1].url);
        model.incrementIndex();
        subset = model.getThumbnailsSubset();
        expect(subset.length).toEqual(props.maxItems);
        expect(subset[0].id).toEqual(thumbnails[props.maxItems].id);
        expect(subset[0].url).toEqual(thumbnails[props.maxItems].url);
        expect(subset[props.maxItems - 1].id).toEqual(thumbnails[2 * props.maxItems - 1].id);
        expect(subset[props.maxItems - 1].url).toEqual(thumbnails[2 * props.maxItems - 1].url);
    });
});
describe('<ImageNavigatorModel /> image-navigator-icon', () => {
    it('should initialize expected properties:', function () {
        let props = {
            useIcons: true,
            length: 8,
            maxItems: 4,
            startIndex: 1
        };
        let model = new ImageNavigatorModel_js_1.default(props);
        expect(model.thumbnails.length).toEqual(0);
        expect(model.useIcons).toEqual(props.useIcons);
        expect(model.startIndex).toEqual(props.startIndex);
        expect(model.maxItems).toEqual(props.maxItems);
        expect(model.endIndex).toEqual(4);
        expect(model.length).toEqual(props.length);
        props = {
            useIcons: true,
            maxItems: 4
        };
        model = new ImageNavigatorModel_js_1.default(props);
        expect(model.length).toEqual(props.maxItems);
    });
    it('usePlaceholders should return false:', function () {
        const props = {
            thumbnails: undefined,
            useIcons: true,
            length: 8
        };
        const model = new ImageNavigatorModel_js_1.default(props);
        expect(model.usePlaceholders()).toEqual(false);
    });
    it('getUseCase should only have icons selected:', function () {
        const props = {
            thumbnails: undefined,
            useIcons: true,
            length: 8
        };
        const model = new ImageNavigatorModel_js_1.default(props);
        expect(model.usePlaceholders()).toEqual(false);
        expect(model.getUseCase().thumbnails).toEqual(false);
        expect(model.getUseCase().icons).toEqual(true);
        expect(model.getUseCase().placeholders).toEqual(false);
    });
    it('getItemChildClass should return \'image-navigator-icon\':', function () {
        const props = {
            thumbnails: undefined,
            useIcons: true,
            length: 8
        };
        const model = new ImageNavigatorModel_js_1.default(props);
        expect(model.getItemChildClass()).toEqual('image-navigator-icon');
    });
    it('getItemParentClass should return icon class case:', function () {
        const props = {
            thumbnails: undefined,
            useIcons: true,
            length: 8
        };
        const model = new ImageNavigatorModel_js_1.default(props);
        expect(model.getItemParentClass()).toEqual('image-navigator-item image-navigator-icon-item');
    });
    it('getItemUrls should return icons subset:', function () {
        const props = {
            thumbnails: undefined,
            useIcons: true,
            maxItems: 4,
            length: 8
        };
        const model = new ImageNavigatorModel_js_1.default(props);
        let subset = model.getItemUrls();
        expect(subset.length).toEqual(props.maxItems);
        expect(subset[0].id).toEqual(0);
        expect(subset[props.maxItems - 1].id).toEqual(3);
        model.incrementIndex();
        subset = model.getItemUrls();
        expect(subset.length).toEqual(props.maxItems);
        expect(subset[0].id).toEqual(4);
        expect(subset[props.maxItems - 1].id).toEqual(7);
    });
    it('getIconsSubset should return icons subset of max items with ids starting from the current min index:', function () {
        const props = {
            thumbnails: undefined,
            useIcons: true,
            maxItems: 4,
            length: 8
        };
        const model = new ImageNavigatorModel_js_1.default(props);
        let subset = model.getIconsSubset();
        expect(subset.length).toEqual(props.maxItems);
        expect(subset[0].id).toEqual(0);
        expect(subset[props.maxItems - 1].id).toEqual(3);
        model.incrementIndex();
        subset = model.getIconsSubset();
        expect(subset.length).toEqual(props.maxItems);
        expect(subset[0].id).toEqual(4);
        expect(subset[props.maxItems - 1].id).toEqual(7);
    });
});
describe('<ImageNavigatorModel /> image-navigator-placeholder', () => {
    it('should initialize expected properties:', function () {
        let props = {
            useIcons: false,
            length: 8,
            maxItems: 3,
            startIndex: 2
        };
        let model = new ImageNavigatorModel_js_1.default(props);
        expect(model.thumbnails.length).toEqual(0);
        expect(model.useIcons).toEqual(props.useIcons);
        expect(model.startIndex).toEqual(props.startIndex);
        expect(model.maxItems).toEqual(props.maxItems);
        expect(model.endIndex).toEqual(4);
        expect(model.length).toEqual(props.length);
        props = {
            useIcons: false,
            maxItems: 4
        };
        model = new ImageNavigatorModel_js_1.default(props);
        expect(model.length).toEqual(props.maxItems);
        model = new ImageNavigatorModel_js_1.default();
        expect(model.length).toEqual(7);
    });
    it('usePlaceholders should return true:', function () {
        const props = {
            useIcons: false
        };
        const model = new ImageNavigatorModel_js_1.default(props);
        expect(model.usePlaceholders()).toEqual(true);
    });
    it('getUseCase should only have placeholders selected:', function () {
        const props = {
            useIcons: false
        };
        const model = new ImageNavigatorModel_js_1.default(props);
        expect(model.getUseCase().thumbnails).toEqual(false);
        expect(model.getUseCase().icons).toEqual(false);
        expect(model.getUseCase().placeholders).toEqual(true);
    });
    it('getItemChildClass should return \'image-navigator-placeholder\':', function () {
        const props = {
            useIcons: false
        };
        const model = new ImageNavigatorModel_js_1.default(props);
        expect(model.getItemChildClass()).toEqual('image-navigator-placeholder');
    });
    it('getItemParentClass should return base class case:', function () {
        const props = {
            useIcons: false
        };
        const model = new ImageNavigatorModel_js_1.default(props);
        expect(model.getItemParentClass()).toEqual('image-navigator-item');
    });
    it('getItemUrls should return placeholders:', function () {
        const props = {
            useIcons: false,
            maxItems: 4
        };
        const model = new ImageNavigatorModel_js_1.default(props);
        let subset = model.getItemUrls();
        expect(subset.length).toEqual(props.maxItems);
        expect(subset[0]).toEqual(0);
        expect(subset[props.maxItems - 1]).toEqual(3);
    });
    it('getPlaceholdersSubset should return a subset of max items starting from the current min index:', function () {
        const props = {
            useIcons: false,
            maxItems: 4
        };
        const model = new ImageNavigatorModel_js_1.default(props);
        let subset = model.getPlaceholdersSubset();
        expect(subset.length).toEqual(props.maxItems);
        expect(subset[0]).toEqual(0);
        expect(subset[props.maxItems - 1]).toEqual(3);
    });
});
