"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const react_1 = __importDefault(require("react"));
require("./UploadImage.css");
class UploadImage extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUrls: []
        };
    }
    upload(e) {
        const image = e.target.files[0];
        const form = new FormData();
        form.append('image', image);
        axios_1.default.post('https://api.imgbb.com/1/upload?key=87f2937eac78a7ff7c565d4a71f4f265', form)
            .then(res => {
            const url = res.data.data.image.url;
            const imgUrls = this.state.imgUrls;
            imgUrls.push(url);
            this.props.getImgUrl(imgUrls);
            this.setState({
                imgUrls: imgUrls
            });
        })
            .catch(err => console.log(err));
    }
    render() {
        const imgUrls = this.state.imgUrls;
        return (<div>
        {imgUrls.length < 5 ?
                (<react_1.default.Fragment>
            <label for="img">Select image:</label>
            <input type="file" accept="image/*" onChange={this.upload.bind(this)}/>
          </react_1.default.Fragment>)
                :
                    null}

        <div>
          {imgUrls.length > 0 ?
                imgUrls.map((url, key) => {
                    return <img className='shared-upload-imgthumbnail' key={key} src={url}/>;
                })
                :
                    null}
        </div>
      </div>);
    }
}
exports.default = UploadImage;
