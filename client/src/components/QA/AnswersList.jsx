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

  loadMoreAnswers() {
    const {answersDisplay} = this.state;
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

  render() {
    const answers = this.props.answers;
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


    const renderAnswer = Object.keys(answers).map((answerId, key) => {
      const answer = answers[answerId];
      if (key < this.state.answersDisplay) {
        return (
          <div key={answerId} className='answers_list'>
            <div className='answer_body'>{answer.body}</div>
            <DisplayPhotos photos={answer.photos} />
            <div className='answer_by'>
              <div class='inline'> by {answer.answerer_name} | </div>
              <Helpfulness answer={answer} />
              <div class='inline'> | </div>
              <Report answerId={answerId} />
            </div>
          </div>
        );
      }
    });


    return (
      <div>
        <div className='answers_scrolling'>
          {renderAnswer}
        </div>
        {moreAnswersButton()}
      </div >
    );
  }
}


export default AnswersList;