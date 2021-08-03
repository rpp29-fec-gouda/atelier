import axios from 'axios';
import React from 'react';
import AddingForm from './AddingForm';
import QuestionsList from './QuestionsList';
import SearchQuestions from './SearchQuestion';
import '../css/QA.css';

class QA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: '',
      questions: [],
      questionsFiltered: [],
      addQuestionButton: true
    };
  }

  componentDidMount() {
    axios.get('/qa/questions?product_id=' + this.props.productId + '&count=20')
      .then(res => {
        this.setState({
          questions: res.data.results,
          productId: this.props.productId
        });
      })
      .catch(err => {
        console.log(err.stack);
      });
  }

  componentDidUpdate() {
    if (this.state.productId !== this.props.productId) {
      axios.get('/qa/questions?product_id=' + this.props.productId + '&count=20')
        .then(res => {
          this.setState({
            questions: res.data.results,
            productId: this.props.productId
          });
        })
        .catch(err => {
          console.log(err.stack);
        });

    }
  }

  addQuestionClick() {
    if (this.state.addQuestionButton) {
      this.setState({
        addQuestionButton: false
      });
    } else {
      this.setState({
        addQuestionButton: true
      });
    }
  }

  updateQuestionsList(filtered) {
    this.setState({
      questionsFiltered: filtered
    });
  }

  render() {
    if (this.state.questions.length !== 0) {
      let questions;
      if (this.state.questionsFiltered.length === 0) {
        questions = this.state.questions;
      } else {
        questions = this.state.questionsFiltered;
      }

      return (
        <div id='question-answer'>
          <h3>QUESTIONS & ANSWERS</h3>
          <SearchQuestions questions={questions} callback={(filtered) => this.updateQuestionsList(filtered)} />
          <QuestionsList questions={questions} productId={this.props.productId} />
        </div>
      );
    } else {
      return (
        <div id='question-answer'>
          <h3>QUESTIONS & ANSWERS</h3>
          {this.state.addQuestionButton ?
            <button id='addquestion' onClick={this.addQuestionClick.bind(this)}>ADD A QUESTION +</button> :
            <AddingForm productId={this.props.productId} />
          }

        </div>
      );
    }
  }
}


export default QA;