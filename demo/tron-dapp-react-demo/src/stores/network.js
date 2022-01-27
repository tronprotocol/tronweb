import React from 'react';
import { observable } from 'mobx';
import { notification } from 'antd';
import intl from 'react-intl-universal';
import Config from '../config';
import { tronscanTX } from '../utils/helper';
import Tip from '../components/Tip';
import { getTrxBalance, getTransactionInfo } from '../utils/blockchain';
export default class NetworkStore {
  @observable tronWeb = false;
  @observable defaultAccount = null; // current login tron account address
  @observable isConnected = null;
  @observable routeName = ''; // current route hash
  @observable lang = '';
  @observable loginModalVisible = false;
  @observable loginModalStep = 1;
  @observable menuFlag = true; // true means open， false means collapse
  @observable start = null;
  @observable nowTime = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  getDescription = (type, item, text) => {
    // console.log('description type: ', type);
    const { tx, title, status } = item;
    let className = '';
    switch (type) {
      case 1:
        className = 'trans-pending';
        break;
      case 2:
        className = 'trans-confirmed';
        break;
      case 3:
        className = 'trans-failed';
        break;
    }
    return (
      <div className={'trans-notify'}>
        <span>{tronscanTX(intl.get('view_on_tronscan'), tx)}</span>
        {type === 3 ? (
          <Tip tip={intl.getHTML('toast.faild_reason')} left>
            <span className={'trans-btn-tip ' + className}>{text}</span>
          </Tip>
        ) : (
          <span className={'trans-btn-tip ' + className}>{text}</span>
        )}
      </div>
    );
  };

  checkPendingTransactions = () => {
    let data = window.localStorage.getItem(window.defaultAccount) || '[]';
    const transactions = JSON.parse(data);

    transactions.map(item => {
      const { tx, status, showPending } = item;
      if (Number(status) === 1) {
        if (showPending) {
          this.logTransactionPending(item);
        }
        item.checkCnt++;
        getTransactionInfo(tx)
          .then(r => {
            if (r) {
              if (r && r.ret && r.ret[0].contractRet === 'SUCCESS') {
                this.logTransactionConfirmed(item);
              } else if (r && r.ret && r.ret[0].contractRet && r.ret[0].contractRet != 'SUCCESS') {
                this.logTransactionFailed(item);
              } else {
                if (item.checkCnt != undefined && item.checkCnt < 30) {
                  setTimeout(this.checkPendingTransactions, 3000);
                } else {
                  this.logTransactionFailed(item, true); // 90s后的失败的交易直接本地删除
                }
              }
            }
          })
          .catch(ex => {
            // setTimeout(this.checkPendingTransactions, 5000);
            console.error(ex);
          });
      }
      return false;
    });
  };

  logTransactionPending = item => {
    item.showPending = false;
    const { tx, intlObj } = item;
    notification.open({
      key: tx,
      message: intl.get(intlObj.title, intlObj.obj),
      description: this.getDescription(1, item, intl.get('trans_status.pending'))
    });
    this.saveTransactions(item);
  };

  logTransactionConfirmed = item => {
    item.status = 2;
    const { tx, intlObj } = item;
    notification.open({
      key: tx,
      message: intl.get(intlObj && intlObj.title4 ? intlObj.title4 : intlObj.title, intlObj.obj),
      description: this.getDescription(2, item, intl.get('trans_status.confirmed'))
    });
    this.saveTransactions(item);

    // todo 5s后 destroy 这个 key 对应的 notification
  };

  logTransactionFailed = (item, needDelete = false) => {
    item.status = 3;
    const { tx, intlObj } = item;
    notification.open({
      key: tx,
      message: intl.get(intlObj && intlObj.title3 ? intlObj.title3 : intlObj.title, intlObj.obj),
      description: this.getDescription(3, item, intl.get('trans_status.failed')),
      duration: 30
    });
    this.saveTransactions(item, needDelete);
    // 更新localstorage的交易状态
    // todo 5s后 destroy 这个 key 对应的 notification
  };

  saveTransactions = (record, needDelete) => {
    const { tx, status } = record;
    let data = window.localStorage.getItem(window.defaultAccount) || '[]';
    let dataArr = JSON.parse(data);
    let pos = 'true';
    dataArr.map((item, index) => {
      if (item.tx === tx) {
        pos = index;
      }
    });
    if (pos === 'true') {
      return;
    }
    dataArr[pos] = record;
    window.localStorage.setItem(window.defaultAccount, JSON.stringify(dataArr));
  };

  setVariablesInterval = () => {
    if (!this.interval) {
      this.interval = setInterval(async () => {
        try {
          this.checkPendingTransactions();
        } catch (err) {
          console.log('interval error:' + err);
        }
      }, 3000);
    }
  };

  setData = (obj = {}) => {
    const self = this;
    Object.keys(obj).map(key => {
      self[key] = obj[key];
    });
  };

  //判断是否有钱包和登录
  checkLogin = () => {
    if (!this.tronWeb || !this.tronWeb.defaultAddress.base58) {
      return false;
    }
    if (!this.defaultAccount) {
      return false;
    }
    return true;
  };

  initTronLinkWallet = async (cb, cbn) => {
    try {
      let timeCount = 0;
      const self = this;
      const tmpTimer1 = setInterval(() => {
        timeCount++;
        if (timeCount > Config.tronLinkTime) {
          self.isConnected = false;
          cbn && cbn();
          clearInterval(tmpTimer1);
        }
        if (window.tronWeb && window.tronWeb.ready) {
          if (process.env.REACT_APP_ENV === 'test') {
            window.tronWeb.setFullNode('https://api.nileex.io');
          }
          self.tronWeb = window.tronWeb;
          self.defaultAccount = self.tronWeb.defaultAddress.base58;
          window.defaultAccount = self.defaultAccount;
          self.isConnected = true;
          cb && cb();
          // this.setVariablesInterval(); // 全局定时任务
          clearInterval(tmpTimer1);
        }
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  };

  connectWallet = async () => {
    this.setData({
      loginModalVisible: true,
      loginModalStep: 1
    });
  };

  listenTronLink = () => {
    window.addEventListener('message', res => {
      if (res.data.message && res.data.message.action == 'setAccount') {
        if (window.tronWeb) {
          if (res.data.message.data.address != this.defaultAccount) {
            window.location.reload();
          }
        } else {
          window.location.reload();
        }
      }
      if (res.data.message && res.data.message.action == 'setNode') {
        window.location.reload();
      }
    });
  };

  changeMenuWidth = () => {
    this.setData({
      menuFlag: !this.menuFlag
    });
  };
}
