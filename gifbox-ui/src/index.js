import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

// Needed to bring in main styles, roboto font etc
import styles from './styles.scss';


const Main = () => (
  <App className={ styles.body } />
);

ReactDOM.render(
  <Main />,
  document.getElementById('root'),
);
