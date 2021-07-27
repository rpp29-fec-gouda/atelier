import React from 'react';
import AddAnswer from './AddAnswer';

import Answer from './AnswersList';


const Question = (props) => {
  const questions = props.questions;
  const individualQuestion = questions.map(question => {
    const answers = question.answers;
    return (
      <div key={question.question_id}>
        <table className='question_table'>
          <tbody>
            <tr>
              <td width='5px' className='character'>Q:</td>
              <td width='200px'> {question.question_body}</td>
              <td width='100px'>Helful? Yes({question.question_helpfulness}) | Add Answer</td>
            </tr>
            <tr>
              <td width='5px' className='character'>A:</td>
              <td width='200px'> <div><Answer answers={answers}/></div></td>
              <td> </td>
            </tr>
          </tbody>
        </table>
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