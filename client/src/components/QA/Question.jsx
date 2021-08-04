import React from 'react';
import AddingForm from './AddingForm';
import Helpfulness from '../shared/Helpfulness';
import AnswersList from './AnswersList';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.onClickHandle.bind(this);
    this.state = {
      addAnswerClicked: false,
      questionId: ''
    };
  }

  onClickHandle(questionId) {
    this.setState({
      addAnswerClicked: !this.state.addAnswerClicked,
      questionId: questionId
    });
  }

  toggleAddAnswer(id) {
    if (this.addAnswerClicked) {
      return (<AddingForm />);
    }
  }

  render() {
    const question = this.props.question;
    const questionId = question.question_id;
    const answers = question.answers;
    return (
      <div key={questionId} className='question'>
        <table className='question_table'>
          <tbody>
            <tr>
              <td width='5px' className='character'>Q:</td>
              <td width='200px'> {question.question_body}</td>
              <td width='50px' className='helpfulness'>
                <Helpfulness question={question} />
              </td>
              <td width='50px'> | <a href='#!' id={questionId} onClick={() => this.onClickHandle(questionId)}> Add answer </a></td>
            </tr>
            <tr>
              <td width='5px' className='character'>A:</td>
              <td width='200px'><AnswersList answers={answers} /></td>
              <td> </td>
            </tr>
          </tbody>
        </table>

        {this.state.addAnswerClicked ?
          <div className='popup'>
            <span className='close' onClick={() => this.onClickHandle(questionId)} >X</span>
            <AddingForm
              questionId={this.state.questionId}
              closePopup={() => this.onClickHandle(questionId)}
            />
          </div> : null
        }
      </div>
    );
  }


}
export default Question;