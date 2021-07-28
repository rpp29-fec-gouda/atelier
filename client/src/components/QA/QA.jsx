import axios from 'axios';
import React from 'react';
import AddQuestion from './AddQuestion';
import QuestionsList from './QuestionsList';
import SearchQuestions from './SearchQuestion';

class QA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    };
  }

  componentDidMount() {
    axios.get('/qa/questions?product_id=28212')
      .then(res => {
        this.setState({
          questions: res.data
        });
      })
      .catch(err => {
        console.log(err.stack);
      });
  }

  render() {
    if (this.state.questions.length !== 0) {
      const questions = this.state.questions.results;
      return (
        <div className='QAComponent'>
          <h2>QUESTIONS & ANSWERS</h2>
          <SearchQuestions />
          <QuestionsList questions={questions} />
        </div>
      );
    } else {
      return (
        <div className='QAComponent'>
          <SearchQuestions />
          <AddQuestion /> 
        </div>
      );
    }
  }
}


export default QA;