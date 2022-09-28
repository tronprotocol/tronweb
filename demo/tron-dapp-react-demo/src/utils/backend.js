import axios from 'axios';
import Config from '../config';
import { BigNumber, randomSleep } from './helper';
const { service } = Config;
const { host } = service;

const env = process.env.REACT_APP_ENV;

export const getUserList = async params => {
  try {
    // let { data } = await axios.get(url);
    return {
      success: true,
      data:
        env === 'test'
          ? [
              {
                tokenAddress: 'TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj',
                tokenDecimal: 6,
                tokenLogoUrl: 'https://coin.top/production/logo/usdtlogo.png',
                tokenName: 'Tether USD',
                tokenSymbol: 'USDT',
                balance: '--'
              }
            ]
          : [
              {
                tokenAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
                tokenDecimal: 6,
                tokenLogoUrl: 'https://coin.top/production/logo/usdtlogo.png',
                tokenName: 'Tether USD',
                tokenSymbol: 'USDT',
                balance: '--'
              }
            ]
    };
  } catch (error) {
    return {
      success: false
    };
  }
};
