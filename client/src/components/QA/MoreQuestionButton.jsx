import React from 'react';

const MoreQuestionButton = (props) => {
  return props.status ?
    (
      < button className='QA_more_questions' onClick={props.moreQuestions} >
        MORE ANSWERED QUESTIONS
      </button>
    )
    :
    null;
};

export default MoreQuestionButton;