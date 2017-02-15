import { createStore, applyMiddleware } from 'redux';
import { thunkMiddleware } from 'redux-thunk';

import appReducer from '/reducers';

/* eslint-disable no-underscore-dangle, no-undef */
export default createStore(
  appReducer,
  applyMiddleware(thunkMiddleware),  // allows us to dispatch() functions (for async)
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable no-underscore-dangle, no-undef */
