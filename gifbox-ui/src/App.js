import React from 'react';
import { Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox/lib/layout';
import { AppBar } from 'react-toolbox/lib/app_bar';

import styles from '/styles.scss';
import GifCard from './components/GifCard';


const App = () => (
  <Layout>
    <NavDrawer>Stuff</NavDrawer>
    <Panel>
      <AppBar>Stuff</AppBar>
      <Panel className={ styles['content-area'] }>
        <GifCard url='https://jadedraver-reptivision-dev-2.s3-ap-southeast-2.amazonaws.com/__sized__/gifs/2016-12-11/2016-12-11_150259874983_3hourly-thumbnail-200x200.gif' />
      </Panel>
    </Panel>
  </Layout>
);

export default App;
