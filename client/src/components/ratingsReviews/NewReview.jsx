import React from 'react';
import Modal from '../shared/Modal.jsx';
import StarRating from '../shared/StarRating.jsx';
import UploadImage from '../shared/UploadImage.jsx';
import axios from 'axios';
import './newReview.css';

class NewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      modalTitle: 'Write Your Review',
      modalSubtitle: 'About the ',
      selectedProduct: this.props.selectedProduct,
      formName: 'Review',
      overallRating: '',
      recommend: '',
      characteristics: '',
      reviewSummary: '',
      reviewBody: '',
      photos: [],
      nickname: '',
      email: '',
      charCount: 50,
      Size: undefined,
      Width: undefined,
      Comfort: undefined,
      Quality: undefined,
      Length: undefined,
      Fit: undefined,
      requires: {
        overallRating: '',
        recommend: '',
        characteristics: '',
        reviewBody: '',
        nickname: '',
        email: '',
      }
    };

    this.key = 0;
    this.characteristics = {};
    this.radio = {
      Size: {
        one: 'A size too small',
        two: '1/2a size too small',
        three: 'Perfect',
        four: '1/2a size too big',
        five: 'A size too wide'
      },
      Width: {
        one: 'Too narrow',
        two: 'Slightly narrow',
        three: 'Perfect',
        four: 'Slightly wide',
        five: 'Too wide'
      },
      Comfort: {
        one: 'Uncomfortable',
        two: 'Slightly uncomfortable',
        three: 'OK',
        four: 'Comfortable',
        five: 'Perfect'
      },
      Quality: {
        one: 'Poor',
        two: 'Bellow average',
        three: 'What I expected',
        four: 'Pretty great',
        five: 'Perfect'
      },
      Length: {
        one: 'Runs short',
        two: 'Runs slightly short',
        three: 'Perfect',
        four: 'Runs slightly long',
        five: 'Runs long'
      },
      Fit: {
        one: 'Runs tight',
        two: 'Runs slightly tight',
        three: 'Perfect',
        four: 'Runs slightly long',
        five: 'Runs long'
      },
    };

    this.radioArr = Object.entries(this.radio);
    console.log('radioArr:', this.radioArr);
    this.recommendArr = ['Yes', 'No'];

    this.getImgUrl = this.getImgUrl.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  getImgUrl = (urls) => {
    this.setState({
      imageUrls: urls
    });
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  }

  handleOnChange(e) {
    let id = e.target.id;
    let currentCharacteristic = this.props.characteristics[e.target.name];
    if (id === 'reviewSummary' || id === 'email' || id === 'nickname' || id === 'overallRating' || id === 'recommend') {
      this.setState({
        [id]: e.target.value
      });
    } else if (id === 'reviewBody') {
      let bodyLength = e.target.value.length;
      if (bodyLength <= 50) {
        this.setState({
          [id]: e.target.value,
          charCount: 50 - bodyLength
        });
      } else {
        this.setState({
          [id]: e.target.value
        });
      }
    } else if (id === 'characteristics') {
      this.characteristics[currentCharacteristic.id] = parseInt(e.target.value);
      this.setState({
        [e.target.name]: e.target.value
      });
    } else if (id === 'Yes') {
      this.setState({
        recommend: true
      });
    } else {
      this.setState({
        recommend: false
      });
    }
  }

  checkingRequire() {
    let requires = {};

    for (let key in this.state.requires) {
      if (this.state[key] === '') {
        requires[key] = `${key} is required`;
      } else if (this.state.characteristics === '') {
        requires.characteristics = 'characteristics are required';
      }
    }

    if (Object.keys(requires).length === 0) {
      return true;
    } else {
      this.setState({
        requires: requires
      });
    }
  }

  submit() {
    event.preventDefault();
    let data, url;
    if (this.state.formName === 'Review') {
      url = '/reviews';
      data = {
        rating: this.state.overallRating,
        summary: this.state.reviewSummary,
        body: this.state.reviewBody,
        recommend: this.state.recommend,
        name: this.state.nickname,
        email: this.state.email,
        photos: this.state.photos,
        characteristics: this.characteristics,
        'product_id': this.state.selectedProduct.id
      };
    }

    if (this.checkingRequire()) {
      axios.post(url, data)
        .then(res => {
          console.log('submit success', res);
        })
        .catch(err => console.log('submit err', err));
    }
  }

  render() {
    return this.state.selectedProduct ? (
      <div id='rr-new-review'>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <h1 className='modal-title'>{this.state.modalTitle}</h1>
          <h2 className='modal-subtitle'>{this.state.modalSubtitle} {this.state.selectedProduct.name}</h2>

          <form className='rr-new-review' onSubmit={this.submit.bind(this)}>
            <div className='rr-new-review-form'>
              <h3>*Overal Rating</h3>
              <StarRating />
              <div style={{ color: 'red' }}>{this.state.requires.overallRating}</div>
              <hr></hr>
            </div>

            <div>
              <h3>*Do you recommend this product?</h3>
              <div>
                <input
                  type="radio"
                  key={this.recommendArr[0]}
                  id={this.recommendArr[0]}
                  name='recommend'
                  value={this.recommendArr[0]}
                  onChange={this.handleOnChange.bind(this)}
                />{this.recommendArr[0]}

                <input
                  type="radio"
                  key={this.recommendArr[1]}
                  id={this.recommendArr[1]}
                  name='recommend'
                  value={this.recommendArr[1]}
                  onChange={this.handleOnChange.bind(this)}
                />{this.recommendArr[1]}
              </div>
              <div style={{ color: 'red' }}>{this.state.requires.recommend}</div>
              <hr></hr>
            </div>

            <div>
              <h3>*Rate Characteristics</h3>
              {this.radioArr.map((item, index) => (
                this.props.characteristics.hasOwnProperty(item[0]) ?
                  <div key={item[0] + index}>
                    <h4 key={index}>*{item[0]}</h4>
                    <div key={item[0]}>{this.state[item[0]] ? this.state[item[0]] + ' selected' : 'none selected'}</div>
                    <div>
                      <input
                        type="radio"
                        className='rr-new-review-char1'
                        key={item[0] + item[1].one}
                        id={'characteristics'}
                        name={item[0]}
                        value={1}
                        onChange={this.handleOnChange.bind(this)}
                      />
                      <label for='characteristics'>
                        {item[1].one}
                      </label>
                      <input
                        type="radio"
                        key={item[0] + item[1].two}
                        id={'characteristics'}
                        name={item[0]}
                        value={2}
                        onChange={this.handleOnChange.bind(this)}
                      />
                      <input
                        type="radio"
                        key={item[0] + item[1].three}
                        id={'characteristics'}
                        name={item[0]}
                        value={3}
                        onChange={this.handleOnChange.bind(this)}
                      />
                      <input
                        type="radio"
                        key={item[0] + item[1].four}
                        id={'characteristics'}
                        name={item[0]}
                        value={4}
                        onChange={this.handleOnChange.bind(this)}
                      />
                      <input
                        type="radio"
                        className='rr-new-review-char5'
                        key={item[0] + item[1].five}
                        id={'characteristics'}
                        name={item[0]}
                        value={5}
                        onChange={this.handleOnChange.bind(this)}
                      />
                      <div>{item[1].five}</div>
                    </div>
                    <div style={{ color: 'red' }}>{this.state.requires.characteristics}</div>
                  </div>
                  : null))}
              <hr></hr>
            </div>

            <div>
              <h3>Review Summary</h3>
              <div>
                <textarea maxlength='60'
                  placeholder='Example: Best purchase ever!'
                  className='text_box'
                  id='reviewSummary'
                  value={this.state.reviewSummary}
                  onChange={this.handleOnChange.bind(this)}>
                </textarea>
              </div>
              <hr></hr>
            </div>

            <div>
              <h3>*Review Body</h3>
              <div>
                <textarea minlength='50' maxlength='1000'
                  placeholder='Why did you like the product or not?'
                  className='text_box'
                  id='reviewBody'
                  value={this.state.reviewBody}
                  onChange={this.handleOnChange.bind(this)}>
                </textarea>
              </div>
              {this.state.charCount > 0 ?
                <div className='rr-new-review-char-count'>Minimum required characters left: [{this.state.charCount}]</div>
                : <div className='rr-new-review-char-count'>Minimum reached</div>
              }
              <div style={{ color: 'red' }}>{this.state.requires.reviewBody}</div>
              <hr></hr>
            </div>

            <div>
              <h3>Upload Photos</h3>
              <UploadImage getImgUrl={this.getImgUrl} />
              <hr></hr>
            </div>

            <div>
              <h3>*What is your nickname:</h3>
              <div>
                <input
                  maxlength='60'
                  placeholder='Example: Jackson11!'
                  id='nickname'
                  value={this.state.nickname}
                  onChange={this.handleOnChange.bind(this)}>
                </input>
              </div>
              <div className='warning_text'>For privacy reasons, do not use your full name or email address</div>
              <div style={{ color: 'red' }}>{this.state.requires.nickname}</div>
              <hr></hr>
            </div>

            <div>
              <h3>*Your email:</h3>
              <div>
                <input maxlength='60'
                  type='email'
                  placeholder='Example: jackson11@email.com'
                  id='email'
                  value={this.state.email}
                  onChange={this.handleOnChange.bind(this)}>
                </input>
              </div>
              <div className='warning_text'>For privacy reasons, you will not be emailed</div>
              <div style={{ color: 'red' }}>{this.state.requires.email}</div>
              <hr></hr>
            </div>
            <div>
              <input type="submit" value="Submit" />
            </div>

          </form>
        </Modal >
        <div id='add-review' class='button uppercase' onClick={this.showModal}>ADD A REVIEW<div class='plus'>+</div></div>
      </div >
    ) : (
      null
    );
  }
}

export default NewReview;