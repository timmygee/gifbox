import React from 'react';
import { Panel, NavDrawer } from 'react-toolbox/lib/layout';
import { AppBar } from 'react-toolbox/lib/app_bar';

import ContentArea from '/components/ContentArea';

import styles from '/styles.scss';

    // <NavDrawer>Stuff</NavDrawer>

const AppInterface = () => (
  <div className={ styles['panel-main'] }>
    <Panel>
      <AppBar>Stuff</AppBar>
      <ContentArea />
    </Panel>
    <NavDrawer>Stuff</NavDrawer>
  </div>
);

export default AppInterface;
