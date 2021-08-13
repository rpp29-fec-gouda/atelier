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
    this.state = {
      clicked: false,
      link: ''
    };
  }

  componentDidMount() {
    if (this.props.answerId) {
      const answerId = this.props.answerId;
      const link = '/qa/questions/' + answerId + '/report';
      this.setState({
        link: link
      });
    } if (this.props.reviewId) {
      const reviewId = this.props.reviewId;
      const link = '/reviews/' + reviewId + '/report';
      this.setState({
        link: link
      });
    }
  }

  reportFn(link) {
    axios.put(link)
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
          <a href='#!' onClick={() => this.reportFn(this.state.link)}>Report</a>
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