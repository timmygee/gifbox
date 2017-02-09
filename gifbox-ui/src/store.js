import { createStore } from 'redux';

import appReducer from '/reducers';

/* eslint-disable no-underscore-dangle, no-undef */
export default createStore(
  appReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable no-underscore-dangle, no-undef */
