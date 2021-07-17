import React from 'react';
import intl from 'react-intl-universal';
import { inject, observer } from 'mobx-react';
import Config from '../config';
import '../assets/css/home.scss';

@inject('network')
@observer
class MarketList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: window.localStorage.getItem('lang') || intl.options.currentLocale
    };
  }
  render() {
    const { lang } = this.state;
    return <div className="user-list"></div>;
  }
}

export default MarketList;
