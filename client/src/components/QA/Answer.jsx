import React from 'react';


const Answer = (props) => {
  const answers = props.answers;
  console.log('answer', answers)
  return answers.map(answer => {
    return (
      <div key={answer.id}>
        <p>{answer.body}</p>
        <div>by {answer.answerer_name} | Helful? Yes ({answer.helpfulness}) | Report</div>
        <p>===================================================</p>
      </div >
    );
  });
};


export default Answer;