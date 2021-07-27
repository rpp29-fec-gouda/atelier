import React from 'react';
import Question from './Question.jsx';
import AddQuestion from './AddQuestion.jsx';


class QuestionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsDisplay: 0,
      moreQuesionButton: false
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
        questionsDisplay: this.state.questionsDisplay + 2,
        moreQuesionButton: false
      });
    }
  }

  moreQuestionsButton() {
    if (this.state.moreQuesionButton) {
      return (
        < button id='moreQuestions' onClick={this.checkRemainQuestion.bind(this)} >
          MORE ANSWERED QUESTIONS
        </button>
      );
    } else {
      return null;
    }
  }

  renderQuestions() {
    let questionsList = [];
    const questions = this.props.questions;
    for (let i = 0; i < this.state.questionsDisplay; i++) {
      questionsList.push(questions[i]);
    }
    return (
      <div>
        <Question questions={questionsList} />
        {this.moreQuestionsButton()}
        <button id='addQuestion'>ADD A QUESTION +</button>
      </div>
    );
  }

  render() {
    return this.renderQuestions();
  }
}

export default QuestionsList;