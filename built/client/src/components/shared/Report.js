"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const react_1 = __importDefault(require("react"));
class Report extends react_1.default.Component {
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
        axios_1.default.put(this.state.url)
            .then(res => {
            console.log(res);
            this.setState({
                clicked: true
            });
        });
    }
    toggleReportText() {
        if (!this.state.clicked) {
            return (<div class='inline'>
          <a href='#!' className='report-link' onClick={this.reportFn}>Report</a>
        </div>);
        }
        else {
            return (<div> </div>);
        }
    }
    render() {
        return this.toggleReportText();
    }
}
exports.default = Report;
