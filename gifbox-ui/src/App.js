import React, { Component } from 'react';
import { Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox/lib/layout';
import { AppBar } from 'react-toolbox/lib/app_bar';

import ContentArea from '/components/ContentArea';
import styles from '/styles.scss';

// TODO get this component calling auth before it renders the content area
class App extends Component {
  render() {
    return (
      <Layout className={ styles.layout }>
        <NavDrawer>Stuff</NavDrawer>
        <Panel>
          <AppBar>Stuff</AppBar>
          <ContentArea />
        </Panel>
      </Layout>
    );
  }
}

export default App;
