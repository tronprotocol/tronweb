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
    this.state = {};
  }

  componentDidMount() {
    this.props.instantActions && this.props.instantActions(); // should excute when componentDidMount, we need not check if a user logined or not
    // when a user change a node or change a account or change a chain type,
    // we shoule listen TronLink to reload the webpage to get new account info
    // this.props.network.listenTronLink();
  }

  render() {
    if (this.props.network.isConnected) return null;
    return <div style={{ textAlign: 'center' }}>connecting your wallet...</div>;
  }
}

export default LeftMenu;
