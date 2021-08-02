import React from 'react';
import Question from './Question.jsx';
import AddForm from './AddingForm.jsx';
import axios from 'axios';
import AddingForm from './AddingForm.jsx';


class QuestionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsDisplay: 0,
      moreQuesionButton: false,
      addQuestionButton: false
    };
  }

  componentDidMount() {
    this.checkRemainQuestion();
  }

  checkRemainQuestion() {
    const questions = this.props.questions;
    const questionsLength = questions.length;
    if (questionsLength - 2 > this.state.questionsDisplay) {
      this.setState({
        questionsDisplay: this.state.questionsDisplay + 2,
        moreQuesionButton: true
      });
    }
    if (questionsLength - 2 <= this.state.questionsDisplay) {
      this.setState({
        questionsDisplay: questionsLength,
        moreQuesionButton: false
      });
    }
  }

  moreQuestionsButton() {
    if (this.state.moreQuesionButton) {
      return (
        < button id='morequestions' className='morequestions' onClick={this.checkRemainQuestion.bind(this)} >
          MORE ANSWERED QUESTIONS
        </button>
      );
    } else {
      return null;
    }
  }

  addQuestionForm() {
    if (this.state.addQuestionButton) {
      return (
        <div className='popup'>
          <span className='close' onClick={this.addQuestionClick.bind(this)}>X</span>
          <AddingForm productId={this.props.productId} />
        </div>
      );
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

  renderQuestions() {
    let questionsList = [];
    const questions = this.props.questions;
    for (let i = 0; i < this.state.questionsDisplay; i++) {
      if (questions[i]) {
        questionsList.push(questions[i]);
      }
    }
    return (
      <div >
        <div className='questionslist'>
          <Question questions={questionsList} />
        </div>
        {this.moreQuestionsButton()}
        <button id='addquestion' onClick={this.addQuestionClick.bind(this)}>ADD A QUESTION +</button>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderQuestions()}
        {this.addQuestionForm()}
      </div>

    );
  }
}

export default QuestionsList;