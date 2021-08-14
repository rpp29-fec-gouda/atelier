import React from 'react';
import Helpfulness from '../shared/Helpfulness';
import Report from '../shared/Report';
import DisplayPhotos from './DisplayPhotos';

class AnswersList extends React.Component {
  constructor(props) {
    super(props);
    this.answersLength = Object.keys(this.props.answers).length;
    this.loadMoreAnswers = this.loadMoreAnswers.bind(this);
    this.state = {
      answersDisplay: 2,
      showButton: false,
      buttonLabel: 'COLLAPSE ANSWERS',
      answersLength: this.answersLength
    };
  }

  componentDidMount() {
    if (this.answersLength > this.state.answersDisplay) {
      this.setState({
        showButton: true,
        buttonLabel: 'LOAD MORE ANSWERS'
      });
    }
  }

  componentDidUpdate() {
    const newAnswersLength = Object.keys(this.props.answers).length;
    if (this.answersLength !== newAnswersLength) {
      if (this.state.answersDisplay === this.answersLength) {
        this.setState({
          answersDisplay: newAnswersLength
        });
      }
    }
  }

  loadMoreAnswers() {
    const { answersDisplay } = this.state;
    if (answersDisplay === 2) {
      this.setState({
        answersDisplay: this.answersLength,
        buttonLabel: 'COLLAPSE ANSWERS'
      });
    } else {
      this.setState({
        answersDisplay: 2,
        buttonLabel: 'LOAD MORE ANSWERS'
      });
    }
  }

  sortAnswers() {
    const answers = this.props.answers;
    let sellerAnswers = [];
    let otherAnswers = [];
    Object.keys(answers).forEach(answerId => {
      if (answers[answerId].answerer_name === 'Seller') {
        sellerAnswers.push(answers[answerId]);
      } else {
        otherAnswers.push(answers[answerId]);
      }
    });

    sellerAnswers.sort(function (a, b) {
      return b.helpfulness - a.helpfulness;
    });
    otherAnswers.sort(function (a, b) {
      return b.helpfulness - a.helpfulness;
    });

    const result = sellerAnswers.concat(otherAnswers);
    return result;
  }

  render() {
    const answers = this.sortAnswers();
    const moreAnswersButton = () => {
      if (this.state.showButton) {
        return (
          <div className='qa-more-answer'>
            <span href='#!' onClick={this.loadMoreAnswers.bind(this)} >{this.state.buttonLabel}</span>
          </div>
        );
      } else {
        return null;
      }
    };


    const renderAnswer = answers.map((answer, key) => {
      if (key < this.state.answersDisplay) {
        return (
          <div key={answer.id} className='qa-answers-list'>
            <div className='qa-answer-body'>{answer.body}</div>
            <DisplayPhotos photos={answer.photos} />
            <div className='qa-answer-by'>
              <div className='inline'> by {answer.answerer_name} | </div>
              <Helpfulness answer={answer} />
              <div className='inline'> | </div>
              <Report answerId={answer.id} />
            </div>
          </div>
        );
      }
    });


    return (
      <React.Fragment >
        <div className='qa-answers-scrolling'>
          {renderAnswer}
        </div>
        {moreAnswersButton()}
      </React.Fragment >
    );
  }
}


export default AnswersList;