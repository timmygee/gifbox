import React, { Component } from 'react';
import { Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox/lib/layout';
import { AppBar } from 'react-toolbox/lib/app_bar';

import ContentArea from '/components/ContentArea';
import styles from '/styles.scss';


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
