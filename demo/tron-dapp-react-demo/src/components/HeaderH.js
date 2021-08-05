import React from 'react';
import isMobile from 'ismobilejs';
import intl from 'react-intl-universal';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Layout, Select, Menu, Modal, Drawer, Tooltip, Popover, Button } from 'antd';

import { cutMiddle, copyToClipboard } from '../utils/helper';
import '../assets/css/header.scss';
import walletSuccess from '../assets/images/walletSuccess.svg';
import walletFail from '../assets/images/walletFail.svg';
import logoSingle from '../assets/images/mainLogo.png';
import tronlink from '../assets/images/tronlinkLogo.svg';
import tronlinkBlue from '../assets/images/tronlinkBlue.svg';
import tronlinkRightArrow from '../assets/images/tronlinkRightArrow.svg';
import { PieChartOutlined, DesktopOutlined, ContainerOutlined } from '@ant-design/icons';

const { Option } = Select;
const { SubMenu } = Menu;

@inject('network')
@observer
class LeftMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: window.localStorage.getItem('lang') || intl.options.currentLocale,
      visible: false,
      step: 1,
      accountModal: false,
      drawerVisible: false,
      mobile: isMobile(window.navigator).any
    };
  }

  componentDidMount() {
    this.props.instantActions && this.props.instantActions(); // should excute when componentDidMount, we need not check if a user logined or not
    if (!this.props.network.isConnected) {
      this.props.network.initTronLinkWallet(
        () => {
          this.props.mountedActions && this.props.mountedActions();
        },
        () => {
          // if a user do not login TronLink wallet, we should do something
          this.props.unmountedActions && this.props.unmountedActions();
        }
      );
    } else {
      this.props.mountedActions && this.props.mountedActions();
    }
    // when a user change a node or change a account or change a chain type,
    // we shoule listen TronLink to reload the webpage to get new account info
    this.props.network.listenTronLink();
  }

  setLanguage = lang => {
    if (lang === 'en-US') {
      lang = 'zh-CN';
    } else {
      lang = 'en-US';
    }
    this.props.network.setData({ lang });
    this.setState({ lang });
    window.localStorage.setItem('lang', lang);
    window.location.search = `?lang=${lang}`;
  };

  handleCancel = () => {
    this.props.network.setData({ loginModalVisible: false });
  };

  goBack = () => {
    this.props.network.setData({ loginModalStep: 1 });
  };

  showLoginModal = e => {
    this.props.network.connectWallet();
  };

  loginWallet = (e, type) => {
    this.props.network.setData({ loginModalStep: 2 });
    this.props.network.initTronLinkWallet(() => {
      if (this.props.network.isConnected) {
        this.props.network.setData({ loginModalStep: 2 });
      }
    });
  };

  showAccountInfo = () => {
    this.setState({ accountModal: true });
  };

  handleCancelAccount = () => {
    this.setState({ accountModal: false });
  };

  hideSecondPop = () => {
    this.props.network.setData({ noSupport: false });
    this.onClose();
  };

  openDrawer = () => {
    this.setState({ drawerVisible: true });
  };

  onClose = () => {
    this.setState({ drawerVisible: false });
  };

  render() {
    const { accountModal, lang, drawerVisible, mobile } = this.state;
    const {
      isConnected,
      defaultAccount,
      defaultSelectedKeys,
      loginModalVisible,
      loginModalStep,
      routeName,
      menuFlag
    } = this.props.network;
    return (
      <>
        <div className="header-container">
          <div className="menu-scroll-frame">
            <div className="menu-scroll">
              <h6 className="header-logo">TRON DAPP Logo</h6>
              <div className="menu-content">
                <div className="features">
                  <div className="connect-wallet">
                    {isConnected ? (
                      <div className={mobile ? 'account-basic-info-m' : 'account-basic-info'}>
                        <div
                          onClick={() => {
                            this.showAccountInfo();
                          }}
                          className="address-text pointer"
                        >
                          <img src={walletSuccess} alt="" />
                          <span className="addr-span">{cutMiddle(defaultAccount, 4, 4)}</span>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={e => {
                          this.showLoginModal(e);
                        }}
                        className="address-text pointer"
                      >
                        <img src={walletFail} alt="" />
                        <span>{intl.get('navi.wallet_linkbtn')}</span>
                      </div>
                    )}
                  </div>
                  <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    inlineCollapsed={this.state.collapsed}
                  >
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                      <Link to="/home">
                        <span id={routeName === 'home' ? 'm-active-menu-text' : ''}>{intl.get('navi.index_btn')}</span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined />}>
                      <Link to="/home1">
                        <span id={routeName === 'home' ? 'm-active-menu-text' : ''}>{intl.get('navi.index_btn1')}</span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<ContainerOutlined />}>
                      <Link to="/home2">
                        <span id={routeName === 'home2' ? 'm-active-menu-text' : ''}>
                          {intl.get('navi.index_btn2')}
                        </span>
                      </Link>
                    </Menu.Item>
                  </Menu>

                  <div className="links">
                    <span
                      className={'lg-mobile logos small-logo language-logo' + (lang === 'zh-CN' ? ' ch-logo' : '')}
                      onClick={() => {
                        this.setLanguage(lang);
                      }}
                    >
                      <span></span>
                      <span>
                        <span className={'en-text ' + (lang === 'en-US' ? 'lg-active' : '')}>English</span>
                        <span className="slice-lg"> / </span>
                        <span className={'zh-text ' + (lang === 'zh-CN' ? 'lg-active' : '')}>中文</span>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          title={intl.get('navi.wallet_linkbtn')}
          visible={loginModalVisible}
          onCancel={this.handleCancel}
          footer={null}
          className="login-modal custom-modal"
          width={320}
        >
          {loginModalStep === 1 ? (
            <div className="center">
              <div className="logo">
                <img src={logoSingle} alt="" />
              </div>
              <div className="mt20 fs12 c-5A5E89">{intl.get('wallet.use_justlend')}</div>
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

              <div className="tronlink-tips">
                <span>{intl.get('wallet.accept_tips')} </span>
                <a href="https://chrome.google.com/webstore/detail/tronlink%EF%BC%88%E6%B3%A2%E5%AE%9D%E9%92%B1%E5%8C%85%EF%BC%89/ibnejdfjmmkpcnlpebklmnkoeoihofec">
                  {intl.get('wallet.service')}
                </a>
                &nbsp;
                <a href="https://chrome.google.com/webstore/detail/tronlink%EF%BC%88%E6%B3%A2%E5%AE%9D%E9%92%B1%E5%8C%85%EF%BC%89/ibnejdfjmmkpcnlpebklmnkoeoihofec">
                  {intl.get('wallet.privacy')}
                </a>
              </div>
            </div>
          ) : (
            <div className="center">
              <div className="logo">
                <img src={logoSingle} alt="" />
              </div>
              <div className="mt20 fs12 c-5A5E89">{intl.get('wallet.authorize_justlend')}</div>
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

        <Modal
          title={intl.get('account_modal.account')}
          footer={null}
          onCancel={this.handleCancelAccount}
          className="login-modal custom-modal"
          visible={accountModal}
          style={defaultSelectedKeys === '1'} // except scan
          width={320}
        >
          <div>
            <img className="mb16" src={tronlinkBlue} />
            <div className="address-con">
              <div className="tip-text mb16 fs12 c-5A5E89">{intl.get('account_modal.connect_with_tronlink')}</div>
              <div className="address-tex mb16">
                <div className="c-0F134F fs12">{defaultAccount}</div>
                <div
                  className="pointer c-3D56D6 fs12"
                  title={defaultAccount}
                  id="copySpan"
                  onClick={e => {
                    copyToClipboard(e, '', 'copySpan');
                  }}
                >
                  {intl.get('account_modal.copy')}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

export default LeftMenu;
