import React from 'react';
import ReactDOM from "react-dom";

class POClickTracker extends React.Component {
  constructor(props) {
    super(props);
  }

  static sessionData = [];

  handleEvent = e => {
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

  handleChildMounted = (element, child) => {
    const DOMNode = ReactDOM.findDOMNode(element);
    if (DOMNode) {
      // NOTE: This is where a tracker can be customized to respond to different events
      // TODO: Generalize this out to do onChange events, such as when a user actually chooses an option from a combo box?
      DOMNode.addEventListener("click", this.handleEvent);
    }
    if (typeof child.ref === "function") {
      child.ref(element);
    }
  };

  wrapWithClass = functionalComponent => (
    class extends React.Component {
      render() {
        return functionalComponent;
      }
    }
  );

  remapChildren(children) {
    return React.Children.map(children, child => {
      // forwarding ref: https://reactjs.org/docs/forwarding-refs.html
      const ref = element => this.handleChildMounted(element, child);

      if (typeof child.type === "string") {
        // Is DOM element, e.g. <button />
        // Cloning element replaces it with a new one with a shallowly appended/replaced set of properties
        // https://reactjs.org/docs/react-api.html#cloneelement
        return React.cloneElement(child, { ref });
      } else if (React.Children.count(child.props.children)) {
        // React component w/ props children, e.g.
        // <Component ... />
        //   <Child ... />
        //   <.../>
        // </Component>
        return React.cloneElement(child, {
          children: this.remapChildren(child.props.children)
        });
      } else if (child.type.prototype.render) {
        // Is React class component w/o props children, e.g. <ClassComponent ... />
        // Checking for prototype render method is the way to differentiate a React class from functional component
        return React.cloneElement(child, { ref });
      } else {
        // Is React functional component w/o props children, e.g. <FunctionComponent ... />
        // Similar to cloneElement,
        // except in this case we are needing to create a React class component from a React functional component
        // https://reactjs.org/docs/react-api.html#createelement
        // It first needs to be wrapped in a class, but this class does not yet exist in the DOM so cannot be cloned
        // This is why createElement is used
        return React.createElement(this.wrapWithClass(child), { ref });
      }
    });
  }

  render() {
    return this.remapChildren(this.props.children);
  }
}

export default POClickTracker;