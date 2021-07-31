import React from 'react';
import ScrollingArrows from '../shared/ScrollingArrows';
import ImageNavigator from './ImageNavigator';
import ExpandedViewZoomed from './ExpandedViewZoomed';

class ExpandedView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isZoomed: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      isZoomed: !this.state.isZoomed
    });
  }

  render() {
    console.log('Rendering expanded view');
    return (
      <div id="expanded-view" onClick={this.handleClick}>
        ExpandedView
        { this.state.isZoomed
        ? <ExpandedViewZoomed />
        : <div>
            <ImageNavigator />
            <ScrollingArrows />
          </div>
        }
        <div class="collapsed-view" onClick={this.props.onClick}>]+[</div>
      </div>
    );
  }
}

export default ExpandedView;