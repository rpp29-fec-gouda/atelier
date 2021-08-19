import React from 'react';
import AddingForm from './AddingForm';
import Helpfulness from '../shared/Helpfulness';
import AnswersList from './AnswersList';
import Report from '../shared/Report';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.addAnswerClicked = this.addAnswerClicked.bind(this);
    this.state = {
      addAnswerClicked: false,
      questionId: '',
    };
  }

  addAnswerClicked(e) {
    const id = e.target ? e.target.id : '';
    this.setState({
      addAnswerClicked: !this.state.addAnswerClicked,
      questionId: id
    });
  }

  scrollToBottom() {
    const questionsBox = document.getElementById('qa-questions-scrolling');
    if (questionsBox) {
      setTimeout(() => {
        questionsBox.scrollTop = questionsBox.scrollHeight - questionsBox.clientHeight;
      }, 10);
    }
  }

  sortQuestions() {
    const questions = this.props.questions;
    questions.sort((a, b) => b.question_helpfulness - a.question_helpfulness);
    return questions;
  }

  render() {
    let count = 0;
    const questions = this.sortQuestions();
    const questionsDisplay = this.props.questionsDisplay;
    const questionsList = questions.map((question) => {
      if (count + 1 <= questionsDisplay) {
        count += 1;
        const questionId = question.question_id;
        const body = question.question_body;
        const answers = question.answers;
        return (
          <div key={questionId} className='qa-question'>
            <table className='qa-question-table'>
              <tbody>
                <tr>
                  <td width='5%' className='qa-character'>Q:</td>
                  <td width='45%' className='qa-question-body'>{body}</td>
                  <td width='30%' className='qa-helpfulness'>
                    <Helpfulness question={question} />
                    <a href='#!'
                      id={questionId}
                      className='qa-add-answer'
                      onClick={this.addAnswerClicked}> Add answer
                    </a>
                    <Report questionId={questionId}/>
                  </td>
                </tr>
                <tr>
                  <td width='5%' className='qa-character'>A:</td>
                  <td width='45%'><AnswersList answers={answers} /></td>
                  <td> </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      }
    });


    return (
      <div>
        <div id='qa-questions-scrolling' className='qa-questions-scrolling'>
          {questionsList}
          {this.scrollToBottom()}
        </div>
        {this.state.addAnswerClicked ?
          <div className='qa-popup'>
            <div className='qa-close' onClick={this.addAnswerClicked} >X</div>
            <AddingForm
              questionId={this.state.questionId}
              closePopup={this.addAnswerClicked}
              updateData={this.props.updateData}
            />
          </div>
          :
          null
        }

      </div>
    );
  }
}
export default Question;