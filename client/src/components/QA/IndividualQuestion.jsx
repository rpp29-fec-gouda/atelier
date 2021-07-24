import React from 'react';
import AddAnswer from './AddAnswer';
import helpfulness from './helpfulness';


const IndividualQuestion = (props) => {
  const clickHandle = (answerId, questionId) => {
    console.log('answer id', answerId);
    console.log('question id', questionId);
  };
  const questions = props.questions;
  console.log('questions', questions);
  const question = questions.map(questionItem => {
    const answers = questionItem.answers;


    const answer = Object.keys(answers).map((answerItem) => {

      const answerDetails = answers[answerItem];
      return (
        <div key={answerDetails.id}>
          <p>A: {answerDetails.body}</p>
          <div>by {answerDetails.answerer_name} | Helful? <a onClick={() => helpfulness({questionId: questionItem.question_id, answerId: answerDetails.id})}>Yes</a> ({answerDetails.helpfulness}) | Report</div>
          <p>===================================================</p>
        </div>
      );
    });

    return (
      <div key={questionItem.question_id}>
        <p>Q: {questionItem.question_body}</p>
        <p>Helful? Yes({questionItem.question_helpfulness}) | Add Answer</p>
        <p>-----------------------------------------------------</p>
        <div>{answer}</div>
      </div>
    );
  });





  return (
    <div>
      {question}
    </div>
  );


};


// if (questions) {
//   console.log('ajfhkajfhalk')
//   const question = questions.map(item =>
//     <div>
//       <p>{item.question_body}</p>

//     </div>
//   );
// }
// return (
//   <div>
//     <h4>Individual Question:</h4>
//     <p>Q: question1 </p>
//     <AddAnswer />
//     <p>A: answer1 </p>
//     <p> helful | report </p>
//     <p>by user</p>
//     <p>Q: question2 </p>
//     <AddAnswer />
//     <p>A: answer2 </p>
//     <p> helful | report </p>
//     <p>by user</p>
//   </div>
// );




export default IndividualQuestion;