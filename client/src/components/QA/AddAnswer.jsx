import React from 'react';
import axios from 'axios';


class AddAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      answer: '',
      requires: {
        username: '',
        email: '',
        answer: ''
      }
    };
  }

  handleOnChange(e) {
    let id = e.target.id;
    if (id === 'username') {
      this.setState({
        username: e.target.value
      });
    }
    if (id === 'email') {
      this.setState({
        email: e.target.value
      });
    }
    if (id === 'answer') {
      this.setState({
        answer: e.target.value
      });
    }
  }

  checkingRequire() {
    let requires = {};
    if (this.state.username.length === 0) {
      requires.username = 'username is require';
    }
    if (this.state.answer.length === 0) {
      requires.answer = 'answer is require';
    }
    if (this.state.email.length === 0) {
      requires.email = 'email is require';
    }
    if (this.state.email.length > 0) {
      const email = this.state.email;
      const re = /\S+@\S+\.\S+/;
      if (!re.test(email)) {
        requires.email = 'email invalid';
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
    const data = {
      body: this.state.answer,
      name: this.state.username,
      email: this.state.email
    };
    const test = {
      body: 'test',
      name: 'test',
      email: 'test@gmail.com'
    };
    if (!this.checkingRequire()) {
      axios.post('/qa/questions/232566/answers', test)
        .then(res => {
          console.log('post answer success', res);
          this.setState({
            username: '',
            email: '',
            answer: '',
            usernameRequire: '',
            emailRequire: '',
            answerRequire: ''
          });
        })
        .catch(err => console.log('post answer err', err));
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submit.bind(this)}>
          <label>
            Username:
            <input
              maxlength='60'
              placeholder='Example: Jackson11!'
              id='username'
              value={this.state.username}
              onChange={this.handleOnChange.bind(this)}>
            </input><p style={{ color: 'red' }}>{this.state.requires.username}</p>
            <p className='warningText'>For privacy reasons, do not use your full name or email address</p>
          </label>
          <label>
            Email:
            <input maxlength='60'
              placeholder='Why did you like the product or not?'
              id='email'
              value={this.state.email}
              onChange={this.handleOnChange.bind(this)}>
            </input><p style={{ color: 'red' }}>{this.state.requires.email}</p>
            <p className='warningText'>For authentication reasons, you will not be emailed</p>
          </label>
          <label>
            Answer:
            <input maxlength='1000'
              placeholder='Maximum 1000 characters'
              id='answer'
              value={this.state.answer}
              onChange={this.handleOnChange.bind(this)}>
            </input><p style={{ color: 'red' }}>{this.state.requires.answer}</p>
          </label><br></br>
          <input type="submit" value="Submit" />
        </form>
      </div >

    );

  }
}


export default AddAnswer;