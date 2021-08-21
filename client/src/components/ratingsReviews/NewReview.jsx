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
      imageUrls: '',
      formName: 'Review',
      'Overall Rating': 5,
      'Recommendation': '',
      'Characteristic': '',
      reviewSummary: '',
      'Review Body': '',
      photos: [],
      'Nickname': '',
      'Email': '',
      charCount: 50,
      Size: '',
      Width: '',
      Comfort: '',
      Quality: '',
      Length: '',
      Fit: '',
      requires: {
        'Overall Rating': '',
        'Recommendation': '',
        'Review Body': '',
        'Nickname': '',
        'Email': '',
        'Size': '',
        'Width': '',
        'Comfort': '',
        'Quality': '',
        'Length': '',
        'Fit': ''
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
    let name = e.target.name;
    let currentCharacteristic = this.props.characteristics[e.target.name];
    if (id === 'reviewSummary' || id === 'Email' || id === 'Nickname' || id === 'Overall Rating' || id === 'Recommendation') {
      this.setState({
        [id]: e.target.value
      });
    } else if (id === 'Review Body') {
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
    } else if (name === 'Size' || name === 'Comfort' || name === 'Quality' || name === 'Length' || name === 'Fit' || name === 'Width') {
      this.characteristics[currentCharacteristic.id] = parseInt(e.target.value);
      this.setState({
        [e.target.name]: e.target.title
      });
    } else if (id === 'Yes') {
      this.setState({
        Recommendation: true
      });
    } else {
      this.setState({
        Recommendation: false
      });
    }
  }

  checkingRequire() {
    let requires = {};

    for (let key in this.state.requires) {
      if (this.state[key] === '') {
        requires[key] = `${key} is required`;
      }

      if (Object.keys(requires).length === 0) {
        return true;
      } else {
        this.setState({
          requires: requires
        });
      }
    }
  }

  submit() {
    event.preventDefault();
    let data, url;
    if (this.state.formName === 'Review') {
      url = '/reviews';
      data = {
        rating: this.state.['Overall Rating'],
        summary: this.state.reviewSummary,
        body: this.state.['Review Body'],
        recommend: this.state.['Recommendation'],
        name: this.state.['Nickname'],
        email: this.state.['Email'],
        photos: this.state.photos,
        characteristics: this.characteristics,
        'product_id': this.state.selectedProduct.id
      };
    }

    if (this.checkingRequire()) {
      axios.post(url, data)
        .then(res => {
          console.log('🌻🌻🌻🌻 AXIOS POST NEW REVIEW 1 🌻🌻🌻🌻: ', res);
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
              <div style={{ color: 'red' }}>{this.state.requires['Overall Rating']}</div>
              <hr></hr>
            </div>

            <div>
              <label for='rr-new-recommendation'>*Do you recommend this product?</label>
              <div>
                <input
                  type="radio"
                  key={this.recommendArr[0]}
                  className='rr-new-recommendation'
                  id={this.recommendArr[0]}
                  name='Recommendation'
                  value={this.recommendArr[0]}
                  onChange={this.handleOnChange.bind(this)}
                />{this.recommendArr[0]}

                <input
                  type="radio"
                  key={this.recommendArr[1]}
                  className='rr-new-recommendation'
                  id={this.recommendArr[1]}
                  name='Recommendation'
                  value={this.recommendArr[1]}
                  onChange={this.handleOnChange.bind(this)}
                />{this.recommendArr[1]}
              </div>
              <div style={{ color: 'red' }}>{this.state.requires['Recommendation']}</div>
              <hr></hr>
            </div>

            <div>
              <label for='rr-new-review-char'>*Rate Characteristics</label>
              {this.radioArr.map((item, index) => (
                this.props.characteristics.hasOwnProperty(item[0]) ?
                  <div key={item[0] + index}>
                    <h4 key={index}>*{item[0]}</h4>
                    {this.state[item[0]] ? <div key={item[0]}>{this.state[item[0]] + ' selected'}</div>
                      : <div key={item[0]}>{'none selected'}</div>
                    }
                    <div>
                      <input
                        type="radio"
                        className='rr-new-review-char'
                        key={item[0] + item[1].one}
                        name={item[0]}
                        title={item[1].one}
                        value={1}
                        onChange={this.handleOnChange.bind(this)}
                      />
                      <label for='Characteristic'>
                        {item[1].one}
                      </label>
                      <input
                        type="radio"
                        className='rr-new-review-char'
                        key={item[0] + item[1].two}
                        name={item[0]}
                        title={item[1].two}
                        value={2}
                        onChange={this.handleOnChange.bind(this)}
                      />
                      <input
                        type="radio"
                        className='rr-new-review-char'
                        key={item[0] + item[1].three}
                        name={item[0]}
                        title={item[1].three}
                        value={3}
                        onChange={this.handleOnChange.bind(this)}
                      />
                      <input
                        type="radio"
                        className='rr-new-review-char'
                        key={item[0] + item[1].four}
                        name={item[0]}
                        title={item[1].four}
                        value={4}
                        onChange={this.handleOnChange.bind(this)}
                      />
                      <input
                        type="radio"
                        className='rr-new-review-char'
                        key={item[0] + item[1].five}
                        name={item[0]}
                        title={item[1].five}
                        value={5}
                        onChange={this.handleOnChange.bind(this)}
                      />
                      <div>{item[1].five}</div>
                    </div>
                    <div style={{ color: 'red' }}>{this.state.requires.[item[0]]}</div>
                  </div>
                  : null))}
              <hr></hr>
            </div>

            <div>
              <label for='rr-summary-text-box'>Review Summary</label>
              <div>
                <textarea maxlength='60'
                  placeholder='Example: Best purchase ever!'
                  className='rr-summary-text-box'
                  id='reviewSummary'
                  value={this.state.reviewSummary}
                  onChange={this.handleOnChange.bind(this)}>
                </textarea>
              </div>
              <hr></hr>
            </div>

            <div>
              <label for='rr-review-body-text-box'>*Review Body</label>
              <div>
                <textarea minlength='50' maxlength='1000'
                  placeholder='Why did you like the product or not?'
                  className='rr-review-body-text-box'
                  id='Review Body'
                  value={this.state.reviewBody}
                  onChange={this.handleOnChange.bind(this)}>
                </textarea>
              </div>
              {this.state.charCount > 0 ?
                <div className='rr-new-review-char-count'>Minimum required characters left: [{this.state.charCount}]</div>
                : <div className='rr-new-review-char-count'>Minimum reached</div>
              }
              <div style={{ color: 'red' }}>{this.state.requires.['Review Body']}</div>
              <hr></hr>
            </div>

            <div>
              <label for='upload-photos'>Upload Photos</label>
              <UploadImage className='upload-photos' getImgUrl={this.getImgUrl} />
              <hr></hr>
            </div>

            <div>
              <label for='nickname'>*What is your nickname:</label>
              <div>
                <input
                  maxlength='60'
                  placeholder='Example: Jackson11!'
                  id='Nickname'
                  className='nickname'
                  value={this.state.nickname}
                  onChange={this.handleOnChange.bind(this)}>
                </input>
              </div>
              <div className='warning_text'>For privacy reasons, do not use your full name or email address</div>
              <div style={{ color: 'red' }}>{this.state.requires.['Nickname']}</div>
              <hr></hr>
            </div>

            <div>
              <label for='email'>*Your email:</label>
              <div>
                <input maxlength='60'
                  type='email'
                  placeholder='Example: jackson11@email.com'
                  className='email'
                  id='Email'
                  value={this.state.email}
                  onChange={this.handleOnChange.bind(this)}>
                </input>
              </div>
              <div className='warning_text'>For privacy reasons, you will not be emailed</div>
              <div style={{ color: 'red' }}>{this.state.requires.['Email']}</div>
              <hr></hr>
            </div>
            <div>
              <label for='rr-review-submit'></label>
              <input className='rr-review-submit' type="submit" value="Submit" />
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