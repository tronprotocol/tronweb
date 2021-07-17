import React from 'react';
import isMobile from 'ismobilejs';
import { inject, observer } from 'mobx-react';
import { tronscanTX } from '../../utils/helper';
import { Modal, Tabs, Input, Button, Progress } from 'antd';
import intl from 'react-intl-universal';

import { LoadingOutlined } from '@ant-design/icons';

import TransCancelledIcon from '../../assets/images/TransactionCanceled.svg';
import TransSubmittedIcon from '../../assets/images/TransactionSubmitted.svg';
import authorizeIcon from '../../assets/images/authorize.svg';

@inject('network')
@inject('system')
@observer
class Transaction extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {}

  close = () => {
    this.props.system.setData({ transModalInfo: { visible: false } });
    // this.props.system.visible = false
  };
  render() {
    const { transModalInfo } = this.props.system;
    const { visible, step, txId, title, obj, title2, title3, title4 } = transModalInfo;
    return (
      <Modal
        title=""
        visible={visible}
        closable={true}
        icon={null}
        onCancel={() => this.props.system.hideTransModal()}
        footer={null}
        width={320}
        className="trans-modal"
      >
        <div className="trans-modal-body center">
          {step == 1 ? (
            <React.Fragment key="step1">
              {title && <div className="trans-modal-title">{intl.get(title4 || title, obj)}</div>}
              <div className="trans-modal-icon">
                <img src={authorizeIcon} className="authorizeIcon" />
                <div className="points">
                  <span className="point"></span>
                  <span className="point"></span>
                  <span className="point"></span>
                </div>
                {/* <LoadingOutlined style={{ fontSize: '80px' }}></LoadingOutlined> */}
              </div>
              <div className="trans-modal-status trans-modal-wait-confirm">{intl.get('deposit.explanation2')}</div>
            </React.Fragment>
          ) : null}
          {step == 2 ? (
            <React.Fragment key="step2">
              <div className="trans-modal-title">{intl.get(title2 || 'deposit.transactionsent', obj)}</div>
              <div className="trans-modal-icon">
                <img src={TransSubmittedIcon} alt="" style={{ width: '40px', marginTop: '30px' }} />
              </div>
              <div className="trans-modal-tips trans-modal-submit-tips">
                {tronscanTX(intl.get('deposit.explanation4'), txId)}
              </div>
              <div
                className="modal-btn border-btn"
                onClick={this.props.system.hideTransModal}
                style={{ marginTop: '40px' }}
              >
                {intl.get('deposit.closed')}
              </div>
            </React.Fragment>
          ) : null}
          {step == 3 ? (
            <React.Fragment key="step3">
              <div className="trans-modal-title">{intl.get(title3 || 'toast.ex_failed', obj)}</div>
              <div className="trans-modal-icon">
                <img src={TransCancelledIcon} alt="" style={{ width: '40px', marginTop: '30px' }} />
              </div>
              <div className="trans-modal-status trans-modal-cancel">{intl.get('deposit.explanation3')}</div>
            </React.Fragment>
          ) : null}
        </div>
      </Modal>
    );
  }
}

export default Transaction;
