import React from 'react';
import Question from './Question.jsx';
import AddQuestion from './AddQuestion.jsx';


class QuestionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayQuestions: 2
    };
  }

  renderQuestions(questions) {
    let questionsList = [];
    for (let i = 0; i < this.state.displayQuestions; i++) {
      questionsList.push(questions[i]);
    }
    return (
      <div>
        <Question questions={questionsList} />
        <AddQuestion />
      </div>
    );
  }

  render() {
    const questions = this.props.questions.results;
    if (questions) {
      return this.renderQuestions(questions);
    } else {
      return (<AddQuestion />);
    }
  }
}


export default QuestionsList;