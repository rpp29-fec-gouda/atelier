import axios from 'axios';
import React from 'react';


class UploadImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrls: []
    };
  }
  //API 87f2937eac78a7ff7c565d4a71f4f265

  upload(e) {
    //console.log('>>>>>>>>>>>>>>>>>>>>>>>>', e.target.files[0]);
    const image = e.target.files[0];
    //const input = document.getElementById('input_image');
    //console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<', input)
    const form = new FormData();
    form.append('image', image);
    axios.post('https://api.imgbb.com/1/upload?key=87f2937eac78a7ff7c565d4a71f4f265', form)
      .then(res => {
        console.log(res.data.data.image.url);
        const url = res.data.data.image.url;
        const imgUrls = this.state.imgUrls;
        imgUrls.push(url);
        this.setState ({
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
          (<div>
            <label for="img">Select image:</label>
            <input type="file" id="img" name="img" accept="image/*" onChange={this.upload.bind(this)} />
          </div>)
          : 
          null
        }

        <div>
          {imgUrls.length > 0 ?
            imgUrls.map((url, key) => {
              return <img className='QA_upload_imgthumnail' key={key} src={url} />;
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