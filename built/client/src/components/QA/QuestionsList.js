"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Question_jsx_1 = __importDefault(require("./Question.jsx"));
const AddingForm_jsx_1 = __importDefault(require("./AddingForm.jsx"));
const AddButton_jsx_1 = __importDefault(require("../shared/AddButton.jsx"));
class QuestionsList extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.moreQuestions = this.moreQuestions.bind(this);
        this.addQuestionClicked = this.addQuestionClicked.bind(this);
        this.state = {
            questionsDisplay: 2,
            moreQuestionButton: false,
            addQuestionButton: false,
            productId: ''
        };
    }
    componentDidMount() {
        const questionsLength = this.props.questions.length;
        const questionsDisplay = this.state.questionsDisplay;
        const moreQuestionButton = questionsLength > questionsDisplay ? true : false;
        this.setState({
            moreQuestionButton: moreQuestionButton,
            productId: this.props.productId
        });
    }
    componentDidUpdate() {
        if (this.state.productId !== this.props.productId) {
            const questionsLength = this.props.questions.length;
            const moreQuestionButton = questionsLength > 2 ? true : false;
            this.setState({
                questionsDisplay: 2,
                productId: this.props.productId,
                moreQuestionButton: moreQuestionButton
            });
        }
    }
    moreQuestions() {
        const questionsLength = this.props.questions.length;
        const questionsDisplay = this.state.questionsDisplay + 2;
        const moreQuestionButton = questionsLength > questionsDisplay ? true : false;
        this.setState({
            questionsDisplay: questionsDisplay,
            moreQuestionButton: moreQuestionButton
        });
    }
    addQuestionForm() {
        if (this.state.addQuestionButton) {
            return (<div className='qa-popup'>
          <span id='close-add-question' className='qa-close' onClick={this.addQuestionClicked}>X</span>
          <AddingForm_jsx_1.default productId={this.props.productId} closePopup={this.addQuestionClicked} updateData={this.props.updateData}/>
        </div>);
        }
    }
    addQuestionClicked() {
        this.setState({
            addQuestionButton: !this.state.addQuestionButton
        });
    }
    render() {
        const moreQuestionButton = this.state.moreQuestionButton;
        return (<div>
        <Question_jsx_1.default questions={this.props.questions} questionsDisplay={this.state.questionsDisplay} updateData={this.props.updateData}/>
        {moreQuestionButton ?
                <AddButton_jsx_1.default id={'qa-more-question'} onClick={this.moreQuestions} label={'MORE ANSWERED QUESTIONS'}/>
                :
                    null}
        <AddButton_jsx_1.default id={'qa-add-question'} onClick={this.addQuestionClicked} label={'ADD A QUESTION'}/>
        {this.addQuestionForm()}
      </div>);
    }
}
exports.default = QuestionsList;
