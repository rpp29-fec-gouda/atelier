"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const PopupPhoto_1 = __importDefault(require("./PopupPhoto"));
require("./displayPhotos.css");
class DisplayPhotos extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.popupPhoto = this.popupPhoto.bind(this);
        this.state = {
            popupPhoto: false,
            src: ''
        };
    }
    popupPhoto(e) {
        const src = e.target.src || null;
        this.setState({
            popupPhoto: !this.state.popupPhoto,
            src: src
        });
    }
    render() {
        const photos = this.props.photos;
        if (photos) {
            return photos.map((photo, index) => {
                return (<div key={photo + index} className='shared-photos-inline'>
            <img alt='display-photo' className='shared-thumbnail' src={photo.url ? photo.url : photo} onClick={this.popupPhoto}>
            </img>
            {this.state.popupPhoto ? <PopupPhoto_1.default src={this.state.src} close={this.popupPhoto}/> : null}
          </div>);
            });
        }
        else {
            return null;
        }
    }
}
exports.default = DisplayPhotos;
