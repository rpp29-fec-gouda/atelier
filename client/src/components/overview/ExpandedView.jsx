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
        {
          this.state.isZoomed
            ?
            <ExpandedViewZoomed />
            :
            <React.Fragment>
              <div class="row">
                <ImageNavigator
                  onClick={this.props.onClickIndexUpdate}
                  photos={this.props.thumbnails}
                  selectedId={this.props.selectedId}
                />
                <div class="column">
                  <div class="collapsed-view-toggle" onClick={this.props.onClick}>xx</div>
                  <ScrollingArrows
                    callback={props.onClickIndexUpdate}
                    max={this.props.thumbnails?.length - 1}
                    stem={true}
                  />
                </div>
              </div>
              <div id="main-image">
                <img src={props.photo} />
              </div>
            </React.Fragment>
        }
      </div>
    );
  }
}

export default ExpandedView;