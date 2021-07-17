import React from 'react';
import intl from 'react-intl-universal';
import { inject, observer } from 'mobx-react';
import Config from '../config';
import '../assets/css/home.scss';

import { Table, Button, Modal, Input } from 'antd';
import { emptyReactNode, formatNumber, isAddress, BigNumber } from '../utils/helper';

@inject('network')
@inject('dapp')
@inject('system')
@observer
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: window.localStorage.getItem('lang') || intl.options.currentLocale,
      modalVisible: false,
      to: '',
      amount: ''
    };
  }

  openTransferModal = () => {
    this.setState({
      modalVisible: true
    });
  };

  closeTransferModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  transfer = async () => {
    const { to, amount } = this.state;
    const amountToken = BigNumber(amount).times(BigNumber(10).pow(Config.defaultDecimal))._toHex(); // for a large amount, we can pass value with hex string
    await this.props.system.transferToken(to, amountToken);
  };

  changeTo = e => {
    const value = e.target.value;
    // if (!isAddress(value)) {
    //   return;
    // }
    this.setState({
      to: value
    });
  };

  changeAmount = e => {
    const value = e.target.value;
    this.setState({
      amount: value
    });
  };

  getColumns = () => {
    const { lang } = this.state;
    const columns = [
      {
        title: intl.get('table.symbol'),
        dataIndex: 'tokenSymbol',
        key: '1',
        render: (text, item) => (
          <a
            href={`${Config.justSwap}?lang=${lang}#/home?tokenAddress=${item.tokenAddress}&type=swap`}
            target="justswap"
          >
            <div className="collateralSymbol">
              <img
                src={item.tokenLogoUrl}
                onError={e => {
                  e.target.onerror = null;
                }}
              />
              <div className="tokenDetail">
                <div className="token-names fw500">{text}</div>
                <div className="description">{item.tokenName}</div>
              </div>
            </div>
          </a>
        )
      },
      {
        title: intl.get('table.address'),
        dataIndex: 'tokenAddress',
        key: '2',
        render: (text, item) => (
          <a
            href={`${Config.justSwap}?lang=${lang}#/home?tokenAddress=${item.tokenAddress}&type=swap`}
            target="justswap"
          >
            {text}
          </a>
        )
      },
      {
        title: intl.get('table.balance'),
        dataIndex: 'balance',
        key: '3',
        render: (text, item) => <span> {formatNumber({ text })}</span>
      },
      {
        title: intl.get('table.transfer'),
        dataIndex: 'operation',
        key: '4',
        render: (text, item) => (
          <Button type="primary" onClick={this.openTransferModal}>
            {intl.get('table.transfer')}
          </Button>
        )
      }
    ];
    return columns;
  };

  render() {
    const { modalVisible, to, amount } = this.state;
    const { userList } = this.props.dapp;
    return (
      <>
        {userList && (
          <div className="user-list">
            <Table
              columns={this.getColumns(userList)}
              dataSource={userList}
              pagination={false}
              locale={{
                emptyText: emptyReactNode
              }}
            />
            <Modal
              title={intl.get('transfer.title')}
              footer={null}
              onCancel={this.closeTransferModal}
              className="custom-modal"
              visible={modalVisible}
            >
              <div>
                <div>{intl.get('transfer.to')}</div>
                <Input value={to} placeholder="please input the recieve address" onChange={this.changeTo}></Input>
                <div style={{ marginTop: '20px' }}>{intl.get('transfer.amount')}</div>
                <Input
                  value={amount}
                  placeholder="please input the transfer amount"
                  onChange={this.changeAmount}
                ></Input>
                <div className="footer" style={{ textAlign: 'center', marginTop: '20px' }}>
                  <Button onClick={this.transfer}>{intl.get('transfer.confirm')}</Button>
                </div>
              </div>
            </Modal>
          </div>
        )}
      </>
    );
  }
}

export default UserList;
