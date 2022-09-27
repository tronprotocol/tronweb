import React from 'react';
import { inject, observer } from 'mobx-react';
import HeaderPage from './Header';
import UserList from './UserList';
import { Modal } from 'antd';
import intl from 'react-intl-universal';
import logoSingle from '../assets/images/mainLogo.svg';
import tronlink from '../assets/images/tronlinkLogo.svg';
import tronlinkRightArrow from '../assets/images/tronlinkRightArrow.svg';
import '../assets/css/home.scss';

@inject('dapp')
@inject('network')
@observer
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginModalStep: 1
    };
  }

  componentDidMount = async () => {
    // this.props.network.initTronLinkWallet();
  };

  mountedActions = async () => {
    await this.props.dapp.getUserList();
  };

  loginWallet = (e, type) => {
    this.setState({
      loginModalStep: 2
    });
    this.props.network.initTronLinkWallet(() => {
      if (this.props.network.isConnected) {
        this.setState({
          loginModalStep: 3
        });
        this.mountedActions();
      }
    });
  };

  render() {
    return (
      <div>
        <HeaderPage mountedActions={this.mountedActions} />
        {this.props.network.isConnected && <UserList />}
        <Modal
          title={intl.get('login_modal.wallet_linkbtn')}
          open={!this.props.network.isConnected}
          onCancel={this.handleCancel}
          footer={null}
          className="login-modal custom-modal"
          width={320}
        >
          {this.state.loginModalStep === 1 ? (
            <div className="center">
              <div className="logo">
                <img src={logoSingle} alt="" />
              </div>
              <div className="mt20 fs12 c-5A5E89">{intl.get('login_modal.connect_to_tronlink')}</div>
              <div className="wallet-list">
                <div
                  className="wallet-item"
                  onClick={e => {
                    this.loginWallet(e, 1);
                  }}
                >
                  <span>
                    <img src={tronlink} className="tronlink-logo" alt="" />
                  </span>
                  <div>
                    <span className="wallet-txt">{intl.get('login_modal.tronlink')}</span>
                    <img src={tronlinkRightArrow} className="tronlink-right-arrow-logo" alt="" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="center">
              <div className="logo">
                <img src={logoSingle} alt="" />
              </div>
              <div className="mt20 fs12 c-5A5E89">{intl.get('login_modal.logining')}</div>
              <div className="wallet-list">
                <div className="wallet-item flex-justify-center">
                  <div className="points">
                    <span className="point"></span>
                    <span className="point"></span>
                    <span className="point"></span>
                  </div>
                </div>
              </div>
              <div className="tronlink-tips">
                <span>{intl.get('wallet.no_wallet')} </span>
                <a href="https://chrome.google.com/webstore/detail/tronlink%EF%BC%88%E6%B3%A2%E5%AE%9D%E9%92%B1%E5%8C%85%EF%BC%89/ibnejdfjmmkpcnlpebklmnkoeoihofec">
                  {intl.get('wallet.click_to_get')}
                </a>
              </div>
            </div>
          )}
        </Modal>
      </div>
    );
  }
}

export default Home;
