import axios from 'axios';
import React from 'react';
import AddingForm from './AddingForm';
import QuestionsList from './QuestionsList';
import SearchQuestions from './SearchQuestion';
import '../css/QA.css';
import ClickedTracker from './ClickedTracker';
import AddButton from '../shared/AddButton';

class QA extends React.Component {
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
    } else {
      console.log(`❓❓❓ GET request for Questions - product ID: ${selectedProduct.id} ❓❓❓`)
      axios.get(`/qa/questions?product_id=${selectedProduct.id}&count=1000`)
        .then(res => {
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
    const {selectedProduct} = this.props;
    if (this.state.productId !== selectedProduct.id) {
      this.fetchData();
    }
  }

  updateData() {
    console.log(`❓❓❓ GET request for Questions - product ID: ${this.props.selectedProduct.id} ❓❓❓`)
    axios.get(`/qa/questions?product_id=${this.props.selectedProduct.id}&count=1000`)
      .then(res => {
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
      return (
        <div id='question-answer' onClick={ClickedTracker}>
          <h3>QUESTIONS & ANSWERS</h3>
          <SearchQuestions
            questions={questions}
            callback={(filteredList) => this.updateQuestionsList(filteredList)}
          /><br></br>
          <QuestionsList
            questions={questions}
            productId={this.state.productId}
            updateData={this.updateData}
          />
        </div>
      );

    } else {
      return (
        <div id='question-answer'>
          <h3>QUESTIONS & ANSWERS</h3>
          <AddButton
            id={'qa-add-question'}
            onClick={this.addQuestionClicked}
            label={'ADD A QUESTION'}
          />
          {this.state.addingForm ?
            <div className='qa-popup'>
              <span className='qa-close' onClick={this.addQuestionClicked} >X</span>
              <AddingForm
                productId={this.state.productId}
                updateData={this.updateData}
                closePopup={this.addQuestionClicked}
              />
            </div>
            :
            null
          }
        </div >
      );
    }
  }
}


export default QA;