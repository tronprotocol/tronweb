import React, { lazy, Suspense } from 'react';
import { Provider } from 'mobx-react';
import { Switch, Route, HashRouter, Redirect } from 'react-router-dom';
import intl from 'react-intl-universal';
import _ from 'lodash';

import Stores from '../stores';

import { SUPPOER_LOCALES } from '../utils/helper';

const Home = lazy(() => import('./Home'));
const Home1 = lazy(() => import('./Home'));
const Home2 = lazy(() => import('./Home'));

const locales = {
  'zh-CN': require('../locales/zh-CN.json'),
  'en-US': require('../locales/en-US.json')
};

class App extends React.Component {
  componentDidMount() {}

  UNSAFE_componentWillMount() {
    this.loadLocales();
  }

  loadLocales = () => {
    let currentLocale = intl.determineLocale({
      urlLocaleKey: 'lang',
      cookieLocaleKey: 'lang'
    });

    // 如果没找到，则默认为汉语
    if (!_.find(SUPPOER_LOCALES, { value: currentLocale })) {
      currentLocale = 'en-US';
    }

    // let currentLocale = 'en-US'; // later will deleted
    window.localStorage.setItem('lang', currentLocale);
    // init 方法将根据 currentLocale 来加载当前语言环境的数据
    return intl.init({
      currentLocale,
      locales
    });
  };

  render() {
    const time = 1;
    const Routes = () => (
      <HashRouter>
        <div>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Suspense fallback={<div></div>}>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/home1" component={Home1} />
              <Route path="/home2" component={Home2} />
            </Switch>
          </Suspense>
        </div>
      </HashRouter>
    );
    return (
      <Provider {...Stores}>
        <Routes />
      </Provider>
    );
  }
}

export default App;
