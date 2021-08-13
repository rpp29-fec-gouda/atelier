import axios from 'axios';
import React from 'react';


class UploadImage extends React.Component {
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
    axios.post('https://api.imgbb.com/1/upload?key=87f2937eac78a7ff7c565d4a71f4f265', form)
      .then(res => {
        console.log(res.data.data.image.url);
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
    return (
      <div>
        {imgUrls.length < 5 ?
          (<React.Fragment>
            <label for="img">Select image:</label>
            <input type="file" accept="image/*" onChange={this.upload.bind(this)} />
          </React.Fragment>)
          :
          null
        }

        <div>
          {imgUrls.length > 0 ?
            imgUrls.map((url, key) => {
              return <img className='QA_upload_imgthumbnail' key={key} src={url} />;
            })
            :
            null
          }
        </div>
      </div>
    );
  }
}

export default UploadImage;