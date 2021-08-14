import React from 'react';
import Question from './Question.jsx';
import AddingForm from './AddingForm.jsx';
import ClickedTracker from './ClickedTracker.jsx';
import AddButton from '../shared/AddButton.jsx';


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
    const questionsLength = this.props.questions.length;
    const questionsDisplay = this.state.questionsDisplay;
    const moreQuestionButton = questionsLength > questionsDisplay ? true : false;
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

  moreQuestions() {
    const questionsLength = this.props.questions.length;
    const questionsDisplay = this.state.questionsDisplay + 2;
    const moreQuestionButton = questionsLength > questionsDisplay ? true : false;
    this.setState({
      questionsDisplay: questionsDisplay,
      moreQuestionButton: moreQuestionButton
    });
  }

  addQuestionForm() {
    if (this.state.addQuestionButton) {
      return (
        <div className='qa-popup'>
          <span className='qa-close' onClick={this.addQuestionClicked}>X</span>
          <AddingForm
            productId={this.props.productId}
            closePopup={this.addQuestionClicked}
            updateData={this.props.updateData}
          />
        </div>
      );
    }
  }

  addQuestionClicked() {
    ClickedTracker('add Question');
    this.setState({
      addQuestionButton: !this.state.addQuestionButton
    });
  }

  render() {
    const moreQuestionButton = this.state.moreQuestionButton;
    return (
      <div>
        <Question
          questions={this.props.questions}
          questionsDisplay={this.state.questionsDisplay}
          updateData={this.props.updateData}
        />
        {moreQuestionButton ?
          <AddButton
            id={'qa-more-question'}
            onClick={this.moreQuestions}
            label={'MORE ANSWERED QUESTIONS'}
          />
          :
          null
        }
        <AddButton
          id={'qa-add-question'}
          onClick={this.addQuestionClicked}
          label={'ADD A QUESTION'}
        />
        {/* <button className='qa-add-question' onClick={this.addQuestionClicked}>ADD A QUESTION +</button> */}
        {this.addQuestionForm()}
      </div >

    );
  }
}

export default QuestionsList;