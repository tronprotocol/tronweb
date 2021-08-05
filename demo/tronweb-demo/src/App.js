import logo from './logo.svg';
import './App.css';

import React from 'react';
import './App.css';

import TronWeb from 'tronweb'

// const mainOptions = {
//   fullNode: "https://testhttpapi.tronex.io",
//   solidityNode: "https://testhttpapi.tronex.io",
//   eventServer: "https://testapi.tronex.io"
// }

// const mainOptions = {
//   fullNode: "https://api.shasta.trongrid.io",
//   solidityNode: "https://api.shasta.trongrid.io",
//   eventServer: "https://api.shasta.trongrid.io"
// }

const mainOptions = {
  fullNode: 'https://api.nileex.io',
  solidityNode: 'https://api.nileex.io',
  eventServer: 'https://api.nileex.io'
  // fullNode: "http://47.252.3.238:8090",
  // solidityNode: "http://47.252.3.238:8090",
  // eventServer: "http://47.252.3.238:8090"
};
const privateKey = '';

const mainGatewayAddress = 'TFLtPoEtVJBMcj6kZPrQrwEdM3W3shxsBU'; //testnet mainchain
const sideGatewayAddress = 'TRDepx5KoQ8oNbFVZ5sogwUxtdYmATDRgX';
const sideChainId = '413AF23F37DA0D48234FDD43D89931E98E1144481B';

const sideOptions = {
  fullNode: 'https://suntest.tronex.io',
  solidityNode: 'https://suntest.tronex.io',
  eventServer: 'https://suntest.tronex.io',
  mainGatewayAddress,
  sideGatewayAddress,
  sideChainId
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    window.tronWeb1 = new TronWeb(mainOptions.fullNode, mainOptions.solidityNode, mainOptions.eventServer, privateKey);
  }

  send = e => {};

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
