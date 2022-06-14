"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./reviewBody.css");
class ReviewBody extends react_1.default.Component {
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
        return reviews ? (<div id='rr-review-body'>

        <div>
          {review.body.length < 250 && this.state.collapsed && (<div id={review.review_id} className='rr-review-body'>{review.body}</div>)}

          {review.body.length > 250 && this.state.collapsed && (<div class='rr-full-review-body'>
              <div id={review.review_id} className='rr-review-body'>{review.body.slice(0, 250)}</div>
              <a href='#!' className='rr-show-more' id={review.review_id} onClick={this.expandBody.bind(this)}>{'Show more'}</a>
            </div>)}

          {review.body.length > 250 && !this.state.collapsed && (<div class='rr-full-review-body'>
              <div id={review.review_id} className='rr-review-body'>{review.body}</div>
              <a href='#!' className='rr-show-more' id={review.review_id} onClick={this.expandBody.bind(this)}>{'Show less'}</a>
            </div>)}
        </div>


      </div>) : (null);
    }
}
exports.default = ReviewBody;
