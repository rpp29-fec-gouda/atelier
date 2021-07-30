import axios from 'axios';
import React from 'react';
import AddQuestion from './AddQuestion';
import QuestionsList from './QuestionsList';
import SearchQuestions from './SearchQuestion';
import '../css/QA.css';

class QA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      questionsFiltered: []
    };
  }

  componentDidMount() {
    axios.get('/qa/questions?product_id=28212')
      .then(res => {
        this.setState({
          questions: res.data.results
        });
      })
      .catch(err => {
        console.log(err.stack);
      });
  }

  updateQuestionsList(filtered) {
    this.setState({
      questionsFiltered: filtered
    });
  }

  render() {
    console.log('questions', this.state.questions);
    if (this.state.questions.length !== 0) {
      let questions;
      if (this.state.questionsFiltered.length === 0) {
        questions = this.state.questions;
      } else {
        questions = this.state.questionsFiltered;
      }

      return (
        <div className='QAComponent'>
          <h2>QUESTIONS & ANSWERS</h2>
          <SearchQuestions questions={questions} callback={(filtered) => this.updateQuestionsList(filtered)} />
          <QuestionsList questions={this.state.questions} />
        </div>
      );
    } else {
      return (
        <div className='QAComponent'>
          <AddQuestion />
        </div>
      );
    }
  }
}


export default QA;