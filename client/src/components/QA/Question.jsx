import React from 'react';
import AddAnswer from './AddAnswer';
import Helpfulness from '../shared/Helpfulness';
import Answer from './AnswersList';

class Question extends React.Component {
  constructor(props) {
    super(props);
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
      return (<AddAnswer />);
    }
  }

  render() {
    const questions = this.props.questions;
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
                <td width='50px'> | <a href='#' onClick={() => this.onClickHandle(questionId)}> Add answer </a></td>
              </tr>
              <tr>
                <td width='5px' className='character'>A:</td>
                <td width='200px'> <div> <Answer answers={answers} /></div></td>
                <td> </td>
              </tr>
            </tbody>
          </table>
          
          {this.state.addAnswerClicked ?
            <div className='popup'>
              <AddAnswer questionId={questionId} />
            </div> : null
          }
        </div>
      );
    });


    return (
      <div>
        {individualQuestion}

      </div>
    );



  }

}
export default Question;