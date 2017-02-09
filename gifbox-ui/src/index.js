import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from '/store';


// Needed to bring in main styles, roboto font etc
import styles from './styles.scss';


const Main = () => (
  <Provider store={ store }>
    <App className={ styles.body } />
  </Provider>
);

ReactDOM.render(
  <Main />,
  document.getElementById('root'),
);
