"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
class POClickTracker extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.handleEvent = e => {
            const element = e.currentTarget;
            const clickData = {
                module: this.props.moduleName,
                element,
                elementId: element.id,
                elementClass: element.className,
                timeStamp: Date.now()
            };
            console.log('%cPOCLickTracker fired!', 'color: yellow');
            console.log('clickData:', clickData);
            POClickTracker.sessionData.push(clickData);
            console.log('Session Data:', POClickTracker.sessionData);
        };
        this.handleChildMounted = (element, child) => {
            const DOMNode = react_dom_1.default.findDOMNode(element);
            if (DOMNode) {
                DOMNode.addEventListener("click", this.handleEvent);
            }
            if (typeof child.ref === "function") {
                child.ref(element);
            }
        };
        this.wrapWithClass = functionalComponent => (class extends react_1.default.Component {
            render() {
                return functionalComponent;
            }
        });
    }
    remapChildren(children) {
        return react_1.default.Children.map(children, child => {
            const ref = element => this.handleChildMounted(element, child);
            if (typeof child.type === "string") {
                return react_1.default.cloneElement(child, { ref });
            }
            else if (react_1.default.Children.count(child.props.children)) {
                return react_1.default.cloneElement(child, {
                    children: this.remapChildren(child.props.children)
                });
            }
            else if (child.type.prototype.render) {
                return react_1.default.cloneElement(child, { ref });
            }
            else {
                return react_1.default.createElement(this.wrapWithClass(child), { ref });
            }
        });
    }
    render() {
        return this.remapChildren(this.props.children);
    }
}
POClickTracker.sessionData = [];
exports.default = POClickTracker;
