import React from 'react';
import Question from './Question.jsx';
import AddingForm from './AddingForm.jsx';
import MoreQuestionButton from './MoreQuestionButton.jsx';


class QuestionsList extends React.Component {
  constructor(props) {
    super(props);
    this.moreQuestions = this.moreQuestions.bind(this);
    this.addQuestionClicked = this.addQuestionClicked.bind(this);
    this.state = {
      questionsDisplay: 2,
      moreQuestionButton: false,
      addQuestionButton: false,
      productId: ''
    };
  }

  componentDidMount() {
    const moreQuestionButton = this.compareLength();
    this.setState({
      moreQuestionButton: moreQuestionButton,
      productId: this.props.productId
    });
  }

  componentDidUpdate() {
    if (this.state.productId !== this.props.productId) {
      const questionsLength = this.props.questions.length;
      const moreQuestionButton = questionsLength > 2 ? true : false;
      this.setState({
        questionsDisplay: 2,
        productId: this.props.productId,
        moreQuestionButton: moreQuestionButton
      });
    }
  }

  compareLength() {
    const questionsLength = this.props.questions.length;
    return questionsLength > this.state.questionsDisplay ? true : false;
  }

  moreQuestions() {
    const questionsDisplay = this.state.questionsDisplay + 2;
    const moreQuestionButton = this.compareLength();
    this.setState({
      questionsDisplay: questionsDisplay,
      moreQuestionButton: moreQuestionButton
    });
  }

  addQuestionForm() {
    if (this.state.addQuestionButton) {
      return (
        <div className='popup'>
          <span className='close' onClick={this.addQuestionClicked}>X</span>
          <AddingForm
            productId={this.props.productId}
            closePopup={this.addQuestionClicked}
          />
        </div>
      );
    }
  }

  addQuestionClicked() {
    this.setState({
      addQuestionButton: !this.state.addQuestionButton
    });
  }

  render() {
    return (
      <div>
        <Question
          questions={this.props.questions}
          questionsDisplay={this.state.questionsDisplay}
        />
        <MoreQuestionButton
          status={this.state.moreQuestionButton}
          moreQuestions={this.moreQuestions}
        />
        <button className='add_question' onClick={this.addQuestionClicked.bind(this)}>ADD A QUESTION +</button>
        {this.addQuestionForm()}
      </div >

    );
  }
}

export default QuestionsList;