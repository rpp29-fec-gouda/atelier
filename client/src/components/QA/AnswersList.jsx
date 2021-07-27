import React from 'react';


class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answersDisplay: 0,
      showButton: true
    };
  }

  componentDidMount() {
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
          <div key={answerId}>
            {answer.body} <br></br>
            <div className='answerBy'>by {answer.answerer_name} | Helful? Yes ({answer.helpfulness}) | Report </div>
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


export default Answer;