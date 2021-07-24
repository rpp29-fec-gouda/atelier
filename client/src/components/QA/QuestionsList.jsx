import React from 'react';
import IndividualQuestion from './IndividualQuestion.jsx';
import AddQuestion from './AddQuestion.jsx';

const QuestionsList = (props) => {
  const questions = props.questions.results;
  //console.log('question list', questions);
  if (questions) {
    return (
      <div>
        <IndividualQuestion questions={questions}/>
        <AddQuestion />
      </div>
    );
  } else {
    return (<AddQuestion />);
  }

  // return (
  //   <AddQuestion />
  // )

};


export default QuestionsList;