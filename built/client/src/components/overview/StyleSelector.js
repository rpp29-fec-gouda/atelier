"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Image_1 = __importDefault(require("../shared/Image"));
const POClickTracker_1 = __importDefault(require("../trackers/POClickTracker"));
require("./styleSelector.css");
const StyleSelector = (props) => {
    console.log('Rendering style selector');
    const rowItemLimit = props.rowItemLimit ? props.rowItemLimit : 4;
    const selectedId = props.selectedId ? props.selectedId : 0;
    const hasItems = () => props.items && props.items.length > 0;
    const getItemsByRow = (items) => {
        return hasItems() ? getStylesByRow(items) : getPlaceHolderItems(rowItemLimit);
    };
    const getPlaceHolderItems = (maxItems) => {
        const placeholders = [];
        for (let i = 0; i < maxItems; i++) {
            placeholders.push({ id: i });
        }
        return placeholders;
    };
    const getStylesByRow = (items) => {
        const itemsByRow = [];
        let itemsOnRow = [];
        let rowItemCount = 0;
        items.forEach(item => {
            rowItemCount++;
            if (rowItemCount > rowItemLimit) {
                itemsByRow.push(itemsOnRow);
                itemsOnRow = [];
                rowItemCount = 1;
            }
            itemsOnRow.push(item);
        });
        if (itemsOnRow.length > 0) {
            itemsByRow.push(itemsOnRow);
        }
        return itemsByRow;
    };
    const handleClick = (e) => {
        var _a, _b;
        props.onClick((_b = (_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.styleId);
    };
    const itemsByRow = getItemsByRow(props.items);
    let rowKey = 0;
    let itemKey = 0;
    return (<div id="po-style-selector">
      <h2 class="uppercase no-select">
        <span class="bold">STYLE &gt;</span> {props.name}
      </h2>
      <POClickTracker_1.default eventName="clickTracker" moduleName="Product Overview">
        <div id="po-styles-list" class="styles column">
        {itemsByRow.map(itemsOnRow => (<div key={rowKey++} class="row">
              {itemsOnRow.map(item => (<div key={itemKey++} class="po-style" data-style-id={item.id} onClick={handleClick}>
                    {item.thumbnail && item.thumbnail !== null &&
                    <Image_1.default imageType="thumbnail" img={{
                            src: item.thumbnail,
                            alt: "style default thumbnail",
                            key: itemKey++,
                            className: "po-style po-style-selector-image",
                            'data-style-id': item.id,
                            onClick: handleClick,
                        }}/>}
                    {item.id === selectedId &&
                    <div class="po-style-selected">✓</div>}
                  </div>))}
            </div>))}
        </div>
      </POClickTracker_1.default>
    </div>);
};
exports.default = StyleSelector;
