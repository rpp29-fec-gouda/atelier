import axios from 'axios';
import React from 'react';
import UploadImage from '../shared/UploadImage';

class AddingForm extends React.Component {
  constructor(props) {
    super(props);
    this.getImgUrl = this.getImgUrl.bind(this);
    this.state = {
      formName: '',
      username: '',
      email: '',
      text: '',
      imageUrls: [],
      requires: {
        username: '',
        email: '',
        text: ''
      }
    };
  }
  componentDidMount() {
    if (this.props.productId) {
      this.setState({
        formName: 'Question'
      });
    }
    if (this.props.questionId) {
      this.setState({
        formName: 'Answer'
      });
    }
  }

  getImgUrl (urls) {
    this.setState({
      imageUrls: urls
    });
  }

  handleOnChange(e) {
    let id = e.target.id;
    if (id === 'username' || id === 'email' || id === 'text') {
      this.setState({
        [id]: e.target.value
      });
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
    if (this.state.formName === 'Question') {
      url = '/qa/questions';
      data = {
        body: this.state.text,
        name: this.state.username,
        email: this.state.email,
        'product_id': this.props.productId
      };
    }
    if (this.state.formName === 'Answer') {
      url = `/qa/questions/${this.props.questionId}/answers`;
      data = {
        body: this.state.text,
        name: this.state.username,
        email: this.state.email,
        photos: this.state.imageUrls
      };
    }

    if (this.checkingRequire()) {
      axios.post(url, data)
        .then(res => {
          console.log('submit success', res);
          this.props.closePopup(0);
          this.props.updateData();
        })
        .catch(err => console.log('submit err', err));
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submit.bind(this)}>
          <table>
            <tbody>
              <tr>
                <td> Username:</td>
                <td>
                  <input
                    maxlength='60'
                    placeholder='Example: Jackson11!'
                    id='username'
                    value={this.state.username}
                    onChange={this.handleOnChange.bind(this)}>
                  </input>
                </td>
              </tr>
              <tr>
                <td></td>
                <td className='qa-warning-text'>For privacy reasons, do not use your full name or email address</td>
              </tr>
              <tr>
                <td></td>
                <td style={{ color: 'red' }}>{this.state.requires.username}</td>
              </tr>


              <tr>
                <td>Email:</td>
                <td>
                  <input maxlength='60'
                    type='email'
                    placeholder='Why did you like the product or not?'
                    id='email'
                    value={this.state.email}
                    onChange={this.handleOnChange.bind(this)}>
                  </input>
                </td>
              </tr>
      
              <tr>
                <td></td>
                <td className='qa-warning-text'>For authentication reasons, you will not be emailed</td>
              </tr>
              <tr>
                <td></td>
                <td style={{ color: 'red' }}>{this.state.requires.email}</td>
              </tr>
              
              <tr>
                <td>{this.state.formName}:</td>
                <td>
                  <textarea maxlength='1000'
                    placeholder='Maximum 1000 characters'
                    className='qa-text-box'
                    id='text'
                    value={this.state.text}
                    onChange={this.handleOnChange.bind(this)}>
                  </textarea>
                </td>
              </tr>
              <tr>
                <td></td>
                <td style={{ color: 'red' }}>{this.state.requires.text}</td>
              </tr>
            </tbody>
          </table>
          {this.state.formName === 'Answer' ?
            <UploadImage getImgUrl={this.getImgUrl}/>
            : 
            null
          }
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddingForm;