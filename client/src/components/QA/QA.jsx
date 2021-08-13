import axios from 'axios';
import React from 'react';
import AddingForm from './AddingForm';
import QuestionsList from './QuestionsList';
import SearchQuestions from './SearchQuestion';
import '../css/QA.css';

class QA extends React.Component {
  constructor(props) {
    super(props);
    this.addQuestionClicked = this.addQuestionClicked.bind(this);
    this.updateData = this.updateData.bind(this);
    this.state = {
      productId: this.props.selectedProduct.id,
      questions: [],
      questionsFiltered: null,
      addingForm: false
    };
  }

  componentDidMount() {
    axios.get(`/qa/questions?product_id=${this.state.productId}&count=1000`)
      .then(res => {
        this.setState({
          questions: res.data.results
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidUpdate() {
    if (this.state.productId !== this.props.selectedProduct.id) {
      axios.get(`/qa/questions?product_id=${this.props.selectedProduct.id}&count=1000`)
        .then(res => {
          this.setState({
            questions: res.data.results,
            productId: this.props.selectedProduct.id
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  updateData() {
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
        <div id='question-answer'>
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
          <button className='QA_add_question' onClick={this.addQuestionClicked}>ADD A QUESTION +</button>
          {this.state.addingForm ?
            <div className='QA_popup'>
              <span className='QA_close' onClick={this.addQuestionClicked} >X</span>
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