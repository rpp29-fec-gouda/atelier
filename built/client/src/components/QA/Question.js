"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const AddingForm_1 = __importDefault(require("./AddingForm"));
const Helpfulness_1 = __importDefault(require("../shared/Helpfulness"));
const AnswersList_1 = __importDefault(require("./AnswersList"));
const Report_1 = __importDefault(require("../shared/Report"));
class Question extends react_1.default.Component {
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
                return (<div key={questionId} className='qa-question'>
            <table className='qa-question-table'>
              <tbody>
                <tr>
                  <td width='5%' className='qa-character'>Q:</td>
                  <td width='45%' className='qa-question-body'>{body}</td>
                  <td width='30%' className='qa-helpfulness'>
                    <Helpfulness_1.default question={question}/>
                    <a href='#!' id={questionId} className='qa-add-answer' onClick={this.addAnswerClicked}> Add answer
                    </a>
                    <Report_1.default questionId={questionId}/>
                  </td>
                </tr>
                <tr>
                  <td width='5%' className='qa-character'>A:</td>
                  <td width='45%'><AnswersList_1.default answers={answers}/></td>
                  <td> </td>
                </tr>
              </tbody>
            </table>
          </div>);
            }
        });
        return (<div>
        <div id='qa-questions-scrolling' className='qa-questions-scrolling'>
          {questionsList}
          {this.scrollToBottom()}
        </div>
        {this.state.addAnswerClicked ?
                <div className='qa-popup'>
            <div className='qa-close' onClick={this.addAnswerClicked}>X</div>
            <AddingForm_1.default questionId={this.state.questionId} closePopup={this.addAnswerClicked} updateData={this.props.updateData}/>
          </div>
                :
                    null}

      </div>);
    }
}
exports.default = Question;
