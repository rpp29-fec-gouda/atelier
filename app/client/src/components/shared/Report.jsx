import axios from 'axios';
import React from 'react';
/*
pass id through component
prop name can be answerId or reviewId
Example: <Report answerId={answerId}/>
*/

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.reportFn = this.reportFn.bind(this);
    this.state = {
      clicked: false,
      url: ''
    };
  }

  componentDidMount() {
    if (this.props.answerId) {
      const answerId = this.props.answerId;
      const url = `/qa/answers/${answerId}/report`;
      this.setState({
        url: url
      });
    } 
    if (this.props.questionId) {
      const questionId = this.props.questionId;
      const url = `/qa/questions/${questionId}/report`;
      this.setState({
        url: url
      });
    } 
    if (this.props.reviewId) {
      const reviewId = this.props.reviewId;
      const url = `/reviews/${reviewId}/report`;
      this.setState({
        url: url
      });
    }
  }

  reportFn() {
    const url = this.state.url;
    axios.put(this.state.url)
      .then(res => {
        console.log(res);
        this.setState({
          clicked: true
        });
      });
  }

  toggleReportText() {
    if (!this.state.clicked) {
      return (
        <div class='inline'>
          <a href='#!' className='report-link' onClick={this.reportFn}>Report</a>
        </div>
      );
    } else {
      return (<div> </div>);
    }
  }

  render() {
    return this.toggleReportText();

  }
}

export default Report;