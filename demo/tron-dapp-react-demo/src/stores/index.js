import NetworkStore from './network';
import System from './system';
import Dapp from './dapp';

class RootStore {
  constructor() {
    this.network = new NetworkStore(this);
    this.system = new System(this);
    this.dapp = new Dapp(this);
  }
}

const store = new RootStore();
export default store;
