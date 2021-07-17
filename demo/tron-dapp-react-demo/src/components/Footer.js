import React from 'react';
import isMobile from 'ismobilejs';
import intl from 'react-intl-universal';
import { inject, observer } from 'mobx-react';
import Config from '../config';
import '../assets/css/home.scss';

@inject('network')
@observer
class FooterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: window.localStorage.getItem('lang') || intl.options.currentLocale
    };
  }
  render() {
    const { lang } = this.state;
    return (
      <div className="footer-container" style={{ textAlign: 'center', marginTop: '30px' }}>
        <span className="version">{Config.version}</span>
      </div>
    );
  }
}

export default FooterPage;
