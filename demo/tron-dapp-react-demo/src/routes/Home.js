import React from 'react';
import { inject, observer } from 'mobx-react';

import HomePage from '../components/Home';

@inject('network')
@observer
class Home extends React.Component {
  render() {
    return <HomePage />;
  }
}

export default Home;
