import React from 'react';
import { observable } from 'mobx';
import { notification } from 'antd';
import intl from 'react-intl-universal';
import Config from '../config';
import { tronscanTX } from '../utils/helper';
import Tip from '../components/Tip';
import { getUserList } from '../utils/backend';
export default class NetworkStore {
  @observable userList = [];
  @observable marketList = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  addKey = (data = []) => {
    data.map((item, index) => (item.key = index));
    return data;
  };

  getUserList = async () => {
    const account = this.rootStore.network.defaultAccount;
    if (!account) return;
    const res = await getUserList(account);
    if (!res.success) return;
    this.userList = this.addKey(res.data);
  };

  getMarketList = () => {};

  setData = (obj = {}) => {
    const self = this;
    Object.keys(obj).map(key => {
      self[key] = obj[key];
    });
  };
}
