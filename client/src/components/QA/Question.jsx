import React from 'react';
import AddingForm from './AddingForm';
import Helpfulness from '../shared/Helpfulness';
import AnswersList from './AnswersList';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.addAnswerClicked = this.addAnswerClicked.bind(this);
    this.state = {
      addAnswerClicked: false,
      questionId: ''
    };
  }

  addAnswerClicked(e) {
    this.setState({
      addAnswerClicked: !this.state.addAnswerClicked,
      questionId: e.target.id
    });
  }


  addAnswerForm() {
    return this.state.addAnswerClicked ?
      <div className='popup'>
        <span className='close' onClick={this.addAnswerClicked} >X</span>
        <AddingForm
          questionId={this.state.questionId}
          closePopup={this.addAnswerClicked}
        />
      </div>
      :
      null;
  }

  render() {
    let count = 0;
    const questions = this.props.questions;
    const questionsDisplay = this.props.questionsDisplay;
    const questionsList = questions.map((question) => {
      if (count + 1 <= questionsDisplay) {
        count += 1;
        const questionId = question.question_id;
        const body = question.question_body;
        const answers = question.answers;
        return (
          <div key={questionId} className='question'>
            <table className='question_table'>
              <tbody>
                <tr>
                  <td width='5%' className='character'>Q:</td>
                  <td width='45%'> {body}</td>
                  <td width='30%' className='helpfulness'>
                    <Helpfulness question={question} />
                  </td>
                  <td width='20%'> | <a href='#!' id={questionId} onClick={this.addAnswerClicked}> Add answer </a></td>
                </tr>
                <tr>
                  <td width='5%' className='character'>A:</td>
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
        {questionsList}
        {this.state.addAnswerClicked ?
          <div className='popup'>
            <span id='close' className='close' onClick={this.addAnswerClicked} >X</span>
            <AddingForm
              questionId={this.state.questionId}
              closePopup={this.addAnswerClicked}
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