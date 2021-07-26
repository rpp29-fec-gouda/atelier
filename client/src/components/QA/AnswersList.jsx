import React from 'react';
import Answer from './Answer';


class AnswersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayAnswer: 2
    };
  }

  answerList() {
    const answers = this.props.answers;
    const answersList = [];
    Object.keys(answers).forEach((answer, key) => {
      if (key < this.state.displayAnswer) {
        answersList.push(answers[answer]);
      }
    });

    return (
      <div>
        <p>A:</p>
        <Answer answers={answersList} />

      </div>
    );


  }


  render() {
    return (
      <div>
        {this.answerList()}
      </div>
    );
  }

}


export default AnswersList;