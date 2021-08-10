import axios from 'axios';
import React from 'react';


class UploadImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  //API 87f2937eac78a7ff7c565d4a71f4f265

  upload(e) {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>', e.target.files[0]);
    const fd = new FormData();
    axios.post("https://api.imgbb.com/1/upload?key='87f2937eac78a7ff7c565d4a71f4f265'", fd)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));

    // imgbbUploader("your-imgbb-api-key-string", "path/to/your/image.png")
    //   .then((response) => console.log(response))
    //   .catch((error) => console.error(error));
    // const file = document.getElementById('img').files[0];
    // let imageEncode;
    // console.log(file);
    // const reader = new FileReader();
    // reader.onloadend = function () {
    //   imageEncode = reader.result;
    //   console.log('???????????????????????????', imageEncode)
    //   const data = {
    //     key: '581edac58db3aadce8b776406730b677',
    //     image: imageEncode
    //   };
    //   axios.post('https://api.imgbb.com/1/upload', cors(), data)
    //     .then(res => console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>', res))
    //     .catch (err => console.log(err));
    // };
    // reader.readAsDataURL(file);
  }

  render() {
    return (
      <div>
        <label for="img">Select image:</label>
        <input type="file" id="img" name="img" accept="image/*" onChange={this.upload.bind(this)} />
      </div>
    );
  }
}

export default UploadImage;