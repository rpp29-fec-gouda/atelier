import React from 'react';
import Modal from '../shared/Modal.jsx';
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
      overallRating: 0,
      recommend: false,
      characteristics: {},
      reviewSummary: '',
      reviewBody: '',
      photos: [],
      nickname: '',
      email: '',
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

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  }

  handleOnChange(e) {
    let id = e.target.id;
    if (id === 'reviewSummary' || id === 'reviewBody' || id === 'email' || id === 'nickname' || id === 'overallRating' || id === 'recommend') {
      this.setState({
        [id]: e.target.value
      });
    } else if (id === 'photo') {
      this.setState({
        [id]: e.target.value
      });
    } else if (id === 'characteristics') {

    }
  }

  checkingRequire() {
    let requires = {};

    for (let key in this.state.requires) {
      if (this.state[key] === '') {
        requires[key] = `${key} is required`;
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
        characteristics: this.state.characteristics,
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
    return (
      <div id='new-review'>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <h1 className='modal-title'>{this.state.modalTitle}</h1>
          <h3 className='modal-subtitle'>{this.state.modalSubtitle} {this.state.selectedProduct.name}</h3>
          <form onSubmit={this.submit.bind(this)}>
            <table>
              <tbody>
                <tr>
                  <td>*Overall Rating:</td>
                  <td className='rating'>
                    <label>
                      <input type="radio" name="stars" value="1" />
                      <span class="icon">★</span>
                    </label>
                    <label>
                      <input type="radio" name="stars" value="2" />
                      <span class="icon">★</span>
                      <span class="icon">★</span>
                    </label>
                    <label>
                      <input type="radio" name="stars" value="3" />
                      <span class="icon">★</span>
                      <span class="icon">★</span>
                      <span class="icon">★</span>
                    </label>
                    <label>
                      <input type="radio" name="stars" value="4" />
                      <span class="icon">★</span>
                      <span class="icon">★</span>
                      <span class="icon">★</span>
                      <span class="icon">★</span>
                    </label>
                    <label>
                      <input type="radio" name="stars" value="5" />
                      <span class="icon">★</span>
                      <span class="icon">★</span>
                      <span class="icon">★</span>
                      <span class="icon">★</span>
                      <span class="icon">★</span>
                    </label>
                  </td>
                </tr>

                <tr>
                  <td>*Do you recommend this product?</td>
                  <div>
                    <label><input type="radio" key={this.key++} id={this.recommendArr[0]} name='recommend' value={this.recommendArr[0]} />{this.recommendArr[0]}</label>
                    <label><input type="radio" key={this.key++} id={this.recommendArr[1]} name='recommend' value={this.recommendArr[1]} />{this.recommendArr[1]}</label>
                  </div>
                </tr>
                <tr></tr>

                {this.radioArr.map((item) => (
                  this.props.characteristics.hasOwnProperty(item[0]) ?
                    <tr>
                      <td>*{item[0]}</td>
                      <div>
                        <label><input type="radio" key={this.key++} id={item[1].one + item[0]} name={item[0]} value={item[1].one} />{item[1].one}</label>
                        <label><input type="radio" key={this.key++} id={item[1].two + item[0]} name={item[0]} value={item[1].two} />2</label>
                        <label><input type="radio" key={this.key++} id={item[1].three + item[0]} name={item[0]} value={item[1].three} />3</label>
                        <label><input type="radio" key={this.key++} id={item[1].four + item[0]} name={item[0]} value={item[1].four} />4</label>
                        <label><input type="radio" key={this.key++} id={item[1].five + item[0]} name={item[0]} value={item[1].five} />{item[1].five}</label>
                      </div>
                    </tr>
                    : null
                ))}

                <tr>
                  <td>Review Summary:</td>
                  <td>
                    <textarea maxlength='60'
                      placeholder='Example: Best purchase ever!'
                      className='text_box'
                      id='reviewSummary'
                      value={this.state.reviewSummary}
                      onChange={this.handleOnChange.bind(this)}>
                    </textarea>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td style={{ color: 'red' }}>{this.state.requires.text}</td>
                </tr>

                <tr>
                  <td>*Review Body:</td>
                  <td>
                    <textarea minlength='50' maxlength='1000'
                      placeholder='Why did you like the product or not?'
                      className='text_box'
                      id='reviewBody'
                      value={this.state.reviewBody}
                      onChange={this.handleOnChange.bind(this)}>
                    </textarea>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td style={{ color: 'red' }}>{this.state.requires.text}</td>
                </tr>

                <tr>
                  <td>Upload Your Photos:</td>
                  <td>
                    <input
                      type='file'
                      id='photo'
                      accept='image/*'
                      multiple
                      value={this.state.photos}
                      onChange={this.handleOnChange.bind(this)}>

                    </input>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td style={{ color: 'red' }}>{this.state.requires.text}</td>
                </tr>

                <tr>
                  <td>*What is your nickname:</td>
                  <td>
                    <input
                      maxlength='60'
                      placeholder='Example: Jackson11!'
                      id='nickname'
                      value={this.state.nickname}
                      onChange={this.handleOnChange.bind(this)}>
                    </input>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td className='warning_text'>For privacy reasons, do not use your full name or email address</td>
                </tr>
                <tr>
                  <td></td>
                  <td style={{ color: 'red' }}>{this.state.requires.username}</td>
                </tr>

                <tr>
                  <td>*Your email:</td>
                  <td>
                    <input maxlength='60'
                      type='email'
                      placeholder='Example: jackson11@email.com'
                      id='email'
                      value={this.state.email}
                      onChange={this.handleOnChange.bind(this)}>
                    </input>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td style={{ color: 'red' }}>{this.state.requires.text}</td>
                </tr>

              </tbody>
            </table>
            <input type="submit" value="Submit" />
          </form>
        </Modal>
        <div id='add-review' class='button uppercase' onClick={this.showModal}>ADD A REVIEW<div class='plus'>+</div></div>
      </div >
    );
  }
}

export default NewReview;