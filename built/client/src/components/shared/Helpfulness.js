"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const axios_1 = __importDefault(require("axios"));
class Helpfulness extends react_1.default.Component {
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
        axios_1.default.put(this.state.link)
            .then(res => {
            this.setState({
                clicked: true,
                helpfulCount: this.state.helpfulCount + 1
            });
        });
    }
    toggleYesText() {
        if (!this.state.clicked) {
            return (<a href='#!' className='yes-link' onClick={() => this.addHelpfulness()}>
          Yes
        </a>);
        }
        else {
            return null;
        }
    }
    render() {
        return (<div className='inline'>
        Helpful?
        {this.toggleYesText()}
        ({this.state.helpfulCount})
      </div>);
    }
}
exports.default = Helpfulness;
