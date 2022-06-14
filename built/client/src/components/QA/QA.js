"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const react_1 = __importDefault(require("react"));
const AddingForm_1 = __importDefault(require("./AddingForm"));
const QuestionsList_1 = __importDefault(require("./QuestionsList"));
const SearchQuestion_1 = __importDefault(require("./SearchQuestion"));
require("../css/QA.css");
const ClickedTracker_1 = __importDefault(require("./ClickedTracker"));
const AddButton_1 = __importDefault(require("../shared/AddButton"));
class QA extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.addQuestionClicked = this.addQuestionClicked.bind(this);
        this.updateData = this.updateData.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.state = {
            productId: this.props.selectedProduct.id,
            questions: [],
            questionsFiltered: null,
            addingForm: false
        };
    }
    fetchData() {
        const { updateCache, checkCache, selectedProduct } = this.props;
        const questionsCache = checkCache('questions', selectedProduct.id);
        if (questionsCache) {
            this.setState({
                questions: questionsCache,
                productId: selectedProduct.id
            });
        }
        else {
            console.log(`❓❓❓GET request for Questions-product ID: ${selectedProduct.id}❓❓❓`);
            axios_1.default.get(`/qa/questions?product_id=${selectedProduct.id}&count=1000`)
                .then(res => {
                console.log(`❓ New Questions associated with product ID ${selectedProduct.id} ❓`, res.data.results);
                updateCache('questions', selectedProduct.id, res.data.results);
                this.setState({
                    questions: res.data.results,
                    productId: selectedProduct.id
                });
            })
                .catch(err => {
                console.log(err);
            });
        }
    }
    componentDidMount() {
        this.fetchData();
    }
    componentDidUpdate() {
        const { selectedProduct } = this.props;
        if (this.state.productId !== selectedProduct.id) {
            this.fetchData();
        }
    }
    updateData() {
        console.log(`❓❓❓ GET request for Questions-product ID: ${this.props.selectedProduct.id} ❓❓❓`);
        axios_1.default.get(`/qa/questions?product_id=${this.props.selectedProduct.id}&count=1000`)
            .then(res => {
            console.log(`❓ New Questions associated with product ID ${selectedProduct.id} ❓`, res.data.results);
            this.setState({
                questions: res.data.results
            });
        })
            .catch(err => {
            console.log(err);
        });
    }
    addQuestionClicked() {
        this.setState({
            addingForm: !this.state.addingForm
        });
    }
    updateQuestionsList(filteredList) {
        this.setState({
            questionsFiltered: filteredList
        });
    }
    render() {
        if (this.state.questions.length !== 0) {
            const questions = this.state.questionsFiltered || this.state.questions;
            return (<div id='question-answer' onClick={ClickedTracker_1.default}>
          <h3>QUESTIONS & ANSWERS</h3>
          <SearchQuestion_1.default questions={questions} callback={(filteredList) => this.updateQuestionsList(filteredList)}/><br></br>
          <QuestionsList_1.default questions={questions} productId={this.state.productId} updateData={this.updateData}/>
        </div>);
        }
        else {
            return (<div id='question-answer'>
          <h3>QUESTIONS & ANSWERS</h3>
          <AddButton_1.default id={'qa-add-question'} onClick={this.addQuestionClicked} label={'ADD A QUESTION'}/>
          {this.state.addingForm ?
                    <div className='qa-popup'>
              <span className='qa-close' onClick={this.addQuestionClicked}>X</span>
              <AddingForm_1.default productId={this.state.productId} updateData={this.updateData} closePopup={this.addQuestionClicked}/>
            </div>
                    :
                        null}
        </div>);
        }
    }
}
exports.default = QA;
