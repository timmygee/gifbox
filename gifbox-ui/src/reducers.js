import { combineReducers } from 'redux';

import { FETCH_CARDS } from '/actions';

const content = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CARDS:
      return { ...state, isLoading: true };
    default:
      return state;
  }
};


export default combineReducers({
  content,
});
