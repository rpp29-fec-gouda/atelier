import React from 'react';
import AddAnswer from './AddAnswer';
import AnswersList from './AnswersList';


const Question = (props) => {

  const questions = props.questions;
  const individualQuestion = questions.map(Question => {
    const answers = Question.answers;
    return (
      <div key={Question.question_id}>
        <p>Q: {Question.question_body}</p>
        <p>Helful? Yes({Question.question_helpfulness}) | Add Answer</p>
        <p>-----------------------------------------------------</p>
        <AnswersList answers={answers}/>
      </div>
    );
  });


  return (
    <div>
      {individualQuestion}
    </div>
  );


};






export default Question;