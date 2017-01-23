import React from 'react';
import { Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox/lib/layout';
import { AppBar } from 'react-toolbox/lib/app_bar';

import GifItem from './components/GifItem';


const App = () => (
  <Layout>
    <NavDrawer>Stuff</NavDrawer>
    <Panel>
      <AppBar>Stuff</AppBar>
      <GifItem />
    </Panel>
  </Layout>
);

export default App;
