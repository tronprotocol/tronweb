import { observable } from 'mobx';
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
    const account = window.defaultAccount;
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
