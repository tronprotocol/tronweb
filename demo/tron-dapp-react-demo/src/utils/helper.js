import React from 'react';
import TronWeb from 'tronweb';
import intl from 'react-intl-universal';
import moment from 'moment';
import bigNumber from 'bignumber.js';
import Config from '../config';

const chain = Config.chain;

const tronWeb = new TronWeb({
  fullHost: chain.fullHost
});

bigNumber.config({ EXPONENTIAL_AT: 1e9 });
bigNumber.prototype._toFixed = function (...arg) {
  return new bigNumber(this.toFixed(...arg)).toString();
};
bigNumber.prototype._toBg = function () {
  return this;
};
bigNumber.prototype._toHex = function () {
  return `0x${this.toString(16)}`;
};

export const toBigNumber = tronWeb.toBigNumber;

// export const BigNumber = tronWeb.BigNumber;
export const BigNumber = bigNumber;

export const toDecimal = tronWeb.toDecimal;

export const getTrxBalance = address => {
  return tronWeb.trx.getBalance(address);
};
export const formatNumber = (_num, dp = 2, rm = 1) => {
  if (_num === '--') return '--';
  return BigNumber(_num).toFormat(dp, rm);
};

export const toFixedDown = (num, decimals = 4) => {
  const d = toBigNumber(10).pow(decimals);
  return BigNumber(num).times(d).integerValue(BigNumber.ROUND_DOWN).div(d).toFixed(decimals);
};

export const fromHex = hexString => {
  return tronWeb.address.fromHex(hexString.replace('/^0x/', '41'));
};

export const addressToHex = addr => {
  return tronWeb.address.toHex(addr);
};

export const isAddress = address => {
  return tronWeb.isAddress(address);
};

export const tronscanAddress = (text, address) => {
  return (
    <a
      className="typo-text-link"
      href={`${Config.tronscanUrl}/address/${address}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
    </a>
  );
};

export const tronscanTX = (text, tx) => {
  return (
    <a
      className="typo-text-link"
      href={`${Config.tronscanUrl}/transaction/${tx}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
    </a>
  );
};

export const copyToClipboard = (e, disBottom = '5px', p = false) => {
  let value = '';
  if (p) {
    value = document.getElementById(p).title;
  } else {
    value = e.target.title;
  }
  value = value.replace(/,/g, '');

  var aux = document.createElement('input');

  if (tronWeb.BigNumber.isBigNumber(value)) {
    aux.setAttribute('value', toBigNumber(value).valueOf());
  } else {
    aux.setAttribute('value', value.valueOf());
  }

  document.body.appendChild(aux);
  aux.select();
  document.execCommand('copy');
  document.body.removeChild(aux);
  const div = document.createElement('div');
  div.innerHTML = intl.get('account_modal.copied');
  div.className = 'copied-style-sp';
  Object.assign(div.style, {
    bottom: disBottom
  });
  if (p) {
    document.getElementById(p).appendChild(div);
  } else {
    e.target.appendChild(div);
  }
  const parent = p ? document.getElementById(p) : e.target;
  setTimeout(() => parent.removeChild(div), 1000);
};

export const SUPPOER_LOCALES = [
  {
    name: 'English',
    value: 'en-US'
  },
  {
    name: '简体中文',
    value: 'zh-CN'
  }
];

export const cutMiddle = (text = '', left = 4, right = 4) => {
  if (text.length <= left + right) return text;
  return `${text.substr(0, left).trim()}...${text.substr(-right)}`;
};

export const numberParser = (str, decimal) => {
  str = String(str);
  if (!str) return { valid: true, str: '' };

  let reg = new RegExp(`^(\\d+)(\\.\\d*)?$`);
  if (decimal !== undefined) {
    reg = new RegExp(`^(\\d+)(\\.\\d{0,${decimal}})?$`);
  }

  if (!reg.test(str)) {
    return { valid: false, str: '' };
  } else {
    return { valid: true, str: str.replace(/^0+(\d)/g, '$1') };
  }
};

export const setTransactionsData = (tx, intlObj) => {
  let data = window.localStorage.getItem(window.defaultAccount) || '[]';
  let dataArr = JSON.parse(data);
  let item = {
    title: '', // compatible
    intlObj,
    tx,
    status: 1, // 1: pending, 2: confirmed, 3: failed
    checkCnt: 0,
    showPending: true
  };
  dataArr.unshift(item);
  window.localStorage.setItem(window.defaultAccount, JSON.stringify(dataArr.slice(0, 10)));
};

export const getParameterByName = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

// Get the whole day that the current time corresponds to the zero time zone, that is, zero o'clock millisecond level
export function getUTCDay(unixDateParams) {
  let unix = moment(moment.unix(unixDateParams).utc().format('YYYY-MM-DD 00:00:00Z')).unix();
  return unix;
}

// Get the last minute of the current time as an integer UTC
export function getLastUTCMinutes() {
  let unix = moment(moment().subtract(1, 'minutes').format('YYYY-MM-DD HH:mm:00')).utc().unix();
  return unix;
}

// Get the current minute of the current time One minute rounded up as an integer UTC
export function getCurrentMinutes() {
  let unix = moment(moment().format('YYYY-MM-DD HH:mm:00')).utc().unix();
  return unix;
}

export const randomSleep = (time = 1000) => {
  return new Promise((reslove, reject) => {
    const timeout = parseInt(Math.random() * time);
    setTimeout(() => {
      reslove();
    }, timeout);
  });
};

export const reTry = async func => {
  try {
    await randomSleep(1000);
    return await func();
  } catch (error) {
    // console.log(error);
    await randomSleep(3000);
    return await reTry(func);
  }
};

export const addKey = (data = []) => {
  data.map((item, index) => {
    item.key = index;
  });
  return [...data];
};

export const emptyReactNode = () => {
  let centerStyle = {
    paddingTop: '10%',
    paddingBottom: '10%',
    position: 'relative'
  };
  let imgStyle = {
    width: '10%',
    maxWidth: '200px',
    minWidth: '100px'
  };
  let textStyle = {
    position: 'absolute',
    transform: 'translate(-50%)',
    top: '40%',
    left: '50%',
    color: '#84869E',
    fontSize: '12px'
  };
  return (
    <div className="center" style={centerStyle}>
      <div className="empty-img">
        <span style={textStyle}>{intl.get('no_data')}</span>
      </div>
    </div>
  );
};
