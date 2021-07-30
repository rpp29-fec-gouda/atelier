import React from 'react';


const SearchQuestions = (props) => {
  const questions = props.questions;
  const callback = props.callback;
  let questionsFiltered = [];


  const changeHandle = (e) => {
    const searchText = e.target.value;
    console.log('searchtext', searchText)
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
      questionsFiltered = [];
      callback(questionsFiltered);
    }
  };


  return (
    <div>
      <form className="search_bar" action="FILL URL">
        <input
          type="text"
          placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS ..."
          name="search"
          onChange={changeHandle}
        ></input>
      </form>
    </div>
  );
};


export default SearchQuestions;