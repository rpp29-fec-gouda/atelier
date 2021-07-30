import axios from 'axios';
import React from 'react';

class AddQuestion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      question: '',
      requires: {
        username: '',
        email: '',
        question: ''

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
    if (id === 'question') {
      this.setState({
        question: e.target.value
      });
    }
  }


  checkingRequire() {
    let requires = {};
    if (this.state.username.length === 0) {
      requires.username = 'username is require';
    }
    if (this.state.question.length === 0) {
      requires.question = 'question is require';
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
      body: this.state.question,
      name: this.state.username,
      email: this.state.email,
      'product_id': 28212
    };
    const test = {
      "body": "test",
      "name": "tester",
      "email": "testemail@gmail.com",
      "product_id": 28212
}
  
    if (!this.checkingRequire()) {
      axios.post('/qa/questions?product_id=28212&page=1&count=25', test)
        .then(res => {
          console.log('post question success', res);
          this.setState({
            username: '',
            email: '',
            question: '',
            usernameRequire: '',
            emailRequire: '',
            questionRequire: ''
          });
        })
        .catch(err => console.log('post qestion err', err));
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
            <p className='warningText'>Why did you like the product or not?</p>
          </label>
          <label>
            Question:
            <input maxlength='1000'
              placeholder='Maximum 1000 characters'
              id='question'
              value={this.state.question}
              onChange={this.handleOnChange.bind(this)}>
            </input><p style={{ color: 'red' }}>{this.state.requires.question}</p>
          </label><br></br>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
};

export default AddQuestion;