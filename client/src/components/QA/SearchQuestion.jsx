import React from 'react';


const SearchQuestions = (props) => {
  const questions = props.questions;
  const callback = props.callback;
  let questionsFiltered = [];


  const handleOnchange = (e) => {
    const searchText = e.target.value;
    if (searchText.length >= 3) {
      questions.forEach(question => {
        const body = question.question_body;
        if (body.includes(searchText)) {
          questionsFiltered.push(question);
        }
      });

      if (questionsFiltered.length !== 0) {
        callback(questionsFiltered);
        questionsFiltered = [];
      }
    }
    if (searchText.length < 3) {
      questionsFiltered = null;
      callback(questionsFiltered);
    }
  };


  return (
    <div>
      <input
        className="QA_search_bar"
        type="text"
        placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS ..."
        name="search"
        onChange={handleOnchange}>
      </input>
    </div>
  );
};


export default SearchQuestions;