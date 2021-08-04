import React from 'react';
import Helpfulness from '../shared/Helpfulness';
import Report from '../shared/Report';

class AnswersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answersDisplay: 0,
      showButton: true
    };
  }

  componentDidMount() {
    const questionId = this.props.questionId;
    this.checkRemainAnswers();
  }

  checkRemainAnswers() {
    const answersLength = Object.keys(this.props.answers).length;
    if (answersLength - 2 > this.state.answersDisplay) {
      this.setState({
        showButton: true,
        answersLength: answersLength,
        answersDisplay: this.state.answersDisplay + 2
      });
    }
    if (answersLength - 2 <= this.state.answersDisplay) {
      this.setState({
        showButton: false,
        answersLength: answersLength,
        answersDisplay: this.state.answersDisplay + 2
      });
    }
  }

  render() {
    const answers = this.props.answers;
    const answersLength = Object.keys(answers).length;
    const moreAnswersButton = () => {
      if (this.state.showButton) {
        return (
          <div>
            < button onClick={this.checkRemainAnswers.bind(this)} > more answers</button >
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
            <div>{answer.body}</div>
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
        {renderAnswer}
        {moreAnswersButton()}
      </div >
    );
  }
}


export default AnswersList;