import axios from 'axios';
import React from 'react';
import AddingForm from './AddingForm';
import QuestionsList from './QuestionsList';
import SearchQuestions from './SearchQuestion';
import '../css/QA.css';

class QA extends React.Component {
  constructor(props) {
    super(props);
    this.addQuestionClicked = this.addQuestionClicked.bind(this);
    this.state = {
      productId: '',
      questions: [],
      questionsFiltered: [],
      addingForm: false
    };
  }

  componentDidMount() {
    axios.get(`/qa/questions?product_id=${this.props.productId}&count=20`)
      .then(res => {
        this.setState({
          questions: res.data.results,
          productId: this.props.productId
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidUpdate() {
    if (this.state.productId !== this.props.productId) {
      axios.get(`/qa/questions?product_id=${this.props.productId}&count=20`)
        .then(res => {
          this.setState({
            questions: res.data.results,
            productId: this.props.productId
          });
        })
        .catch(err => {
          console.log(err);
        });

    }
  }

  addQuestionClicked() {
    this.setState({
      addingForm: !this.state.addingForm
    });
  }

  updateQuestionsList(filtered) {
    this.setState({
      questionsFiltered: filtered
    });
  }

  render() {
    if (this.state.questions.length !== 0) {
      const questions = this.state.questionsFiltered.length === 0 ?
        this.state.questions : this.state.questionsFiltered;

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
          <button className='add_question' onClick={this.addQuestionClicked}>ADD A QUESTION +</button>
          {this.state.addingForm ?
            <div className='popup'>
              <span className='close' onClick={this.addQuestionClicked} >X</span>
              <AddingForm productId={this.state.productId} />
            </div>
            :
            null
          }
        </div >
      );
    }
  }
}


export default QA;