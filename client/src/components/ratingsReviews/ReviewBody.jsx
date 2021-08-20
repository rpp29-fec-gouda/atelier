import React from 'react';

class ReviewBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: true
    };
  }

  expandBody() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    const { reviews, review } = this.props;


    return reviews ? (
      <div id='rr-review-body'>

        <div>
          {review.body.length < 250 && this.state.collapsed && (
            <div id={review.review_id} className='rr-review-body'>{review.body}</div>
          )}

          {review.body.length > 250 && this.state.collapsed && (
            <div class='rr-full-review-body'>
              <div id={review.review_id} className='rr-review-body'>{review.body.slice(0, 250)}</div>
              <a className='rr-show-more' id={review.review_id} onClick={this.expandBody.bind(this)}>{'Show more'}</a>
            </div>
          )}

          {review.body.length > 250 && !this.state.collapsed && (
            <div class='rr-full-review-body'>
              <div id={review.review_id} className='rr-review-body'>{review.body}</div>
              <a className='rr-show-less' id={review.review_id} onClick={this.expandBody.bind(this)}>{'Show less'}</a>
            </div>
          )}
        </div>


      </div>

    ) : (null);
  }
}

export default ReviewBody;