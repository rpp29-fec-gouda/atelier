import React from 'react';
import Helpfulness from '../shared/Helpfulness';
import Report from '../shared/Report';
import DisplayPhotos from './DisplayPhotos';

class AnswersList extends React.Component {
  constructor(props) {
    super(props);
    this.answersLength = Object.keys(this.props.answers).length;
    this.state = {
      answersDisplay: 2,
      showButton: false,
      buttonLabel: 'Collapse answers'
    };
  }

  componentDidMount() {
    if (this.answersLength > this.state.answersDisplay) {
      this.setState({
        showButton: true,
        buttonLabel: 'Load more answers'
      });
    }
  }

  componentDidUpdate() {
    if (this.answersLength !== Object.keys(this.props.answers).length) {
      if (this.state.answersDisplay === this.answersLength) {
        this.setState({
          answersDisplay: Object.keys(this.props.answers).length
        });
      }
    }
  }

  loadMoreAnswers() {
    const { answersDisplay } = this.state;
    if (answersDisplay === 2) {
      this.setState({
        answersDisplay: this.answersLength,
        buttonLabel: 'Collapse answers'
      });
    } else {
      this.setState({
        answersDisplay: 2,
        buttonLabel: 'Load more answers'
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
          <div className='more_answer_button'>
            < button onClick={this.loadMoreAnswers.bind(this)} >{this.state.buttonLabel}</button >
          </div>
        );
      } else {
        return null;
      }
    };


    const renderAnswer = answers.map((answer, key) => {
      if (key < this.state.answersDisplay) {
        return (
          <div key={answer.id} className='answers_list'>
            <div className='answer_body'>{answer.body}</div>
            <DisplayPhotos photos={answer.photos} />
            <div className='answer_by'>
              <div class='inline'> by {answer.answerer_name} | </div>
              <Helpfulness answer={answer} />
              <div class='inline'> | </div>
              <Report answerId={answer.id} />
            </div>
          </div>
        );
      }
    });


    return (
      <React.Fragment >
        <div className='answers_scrolling'>
          {renderAnswer}
        </div>
        {moreAnswersButton()}
      </React.Fragment >
    );
  }
}


export default AnswersList;