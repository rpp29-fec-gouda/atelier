import React from 'react';
import axios from 'axios';

/*
pass module object through component
prop name can be question, answer or review
Example: <Helpfulness question={questionObj} />
*/

class Helpfulness extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      helpfulCount: 0,
      targetId: 0,
      link: ''
    };
  }

  componentDidMount() {
    const target = Object.keys(this.props)[0];
    const targetObj = this.props[target];
    if (target === 'question') {
      const targetId = targetObj['question_id'];
      this.setState({
        helpfulCount: targetObj['question_helpfulness'],
        targetId: targetId,
        link: '/qa/questions/' + targetId + '/helpful'
      });
    }
    if (target === 'answer') {
      const targetId = targetObj['id'];
      this.setState({
        helpfulCount: targetObj['helpfulness'],
        targetId: targetId,
        link: '/qa/answers/' + targetId + '/helpful'
      });
    }
    if (target === 'review') {
      const targetId = targetObj['review_id'];
      this.setState({
        helpfulCount: targetObj['helpfulness'],
        targetId: targetId,
        link: '/reviews/' + targetId + '/helpful'
      });
    }
  }

  componentDidUpdate(prevState) {
    const target = Object.keys(this.props)[0];
    const targetObj = this.props[target];

    if (target === 'review') {
      const targetId = targetObj['review_id'];
      if (this.state.targetId !== targetId) {

        this.setState({
          helpfulCount: targetObj['helpfulness'],
          targetId: targetId,
          link: '/reviews/' + targetId + '/helpful'
        });
      }
    }
  }

  addHelpfulness() {
    axios.put(this.state.link)
      .then(res => {
        this.setState({
          clicked: true,
          helpfulCount: this.state.helpfulCount + 1
        });
      });
  }

  toggleYesText() {
    if (!this.state.clicked) {
      return (
        <a href='#!' onClick={() => this.addHelpfulness()}>
          Yes
        </a>
      );
    } else {
      return null;
    }
  }


  render() {
    return (
      <div class='inline'>
        Helpful?
        {this.toggleYesText()}
        ({this.state.helpfulCount})
      </div>
    );
  }
}

export default Helpfulness;