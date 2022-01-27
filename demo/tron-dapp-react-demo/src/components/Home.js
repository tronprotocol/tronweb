import React from 'react';
import { inject, observer } from 'mobx-react';
import HeaderPage from './Header';
import UserList from './UserList';

@inject('dapp')
@observer
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.migrateRef = React.createRef();
    this.state = {};
  }

  componentDidMount = async () => {};

  mountedActions = async () => {
    await this.props.dapp.getUserList();
  };

  render() {
    return (
      <div>
        <HeaderPage mountedActions={this.mountedActions} />
        {/* <MarketList /> */}
        <UserList />
        {/* <FooterPage /> */}
      </div>
    );
  }
}

export default Home;
