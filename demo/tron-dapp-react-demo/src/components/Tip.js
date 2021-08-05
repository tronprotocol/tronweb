import React from 'react';
import intl from 'react-intl-universal';
import isMobile from 'ismobilejs';
import { inject, observer } from 'mobx-react';
import { Tooltip } from 'antd';

class Tip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { placement = 'bottom' } = this.props;
    return (
      <React.Fragment>
        {this.props.left ? (
          <div className={'flex between ai-center ' + (this.props.toolClass ? this.props.toolClass : '')}>
            <Tooltip
              title={this.props.tip}
              overlayClassName="tooltip"
              placement={placement}
              color="rgba(27,31,38,0.90)"
            >
              <span className="ques">?</span>
            </Tooltip>
            <span className={this.props.titleClass ? this.props.titleClass : ''}>{this.props.children}</span>
          </div>
        ) : (
          <div
            className={
              'flex ' + (this.props.tail ? 'between ' : '') + (this.props.toolClass ? this.props.toolClass : '')
            }
          >
            <span className={this.props.titleClass ? this.props.titleClass : ''}>{this.props.children}</span>
            <Tooltip
              title={this.props.tip}
              overlayClassName="tooltip"
              placement={placement}
              color="rgba(27,31,38,0.90)"
            >
              <span className="ques">?</span>
            </Tooltip>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Tip;
