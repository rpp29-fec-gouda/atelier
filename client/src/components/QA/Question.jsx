import React from 'react';
import AddAnswer from './AddAnswer';
import Helpfulness from '../shared/Helpfulness';
import Answer from './AnswersList';

const Question = (props) => {
  const questions = props.questions;
  const individualQuestion = questions.map(question => {
    const answers = question.answers;
    const helpfulCount = question.question_helpfulness;
    const questionId = question.question_id;
    return (
      <div key={questionId}>
        <table className='question_table'>
          <tbody>
            <tr>
              <td width='5px' className='character'>Q:</td>
              <td width='200px'> {question.question_body}</td>
              <td width='50px' className='helpfulness'>
                <Helpfulness question={question} />
              </td>
              <td width='50px'> | <a href='#' > Add answer </a></td>
            </tr>
            <tr>
              <td width='5px' className='character'>A:</td>
              <td width='200px'> <div> <Answer answers={answers} /></div></td>
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