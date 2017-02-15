import { combineReducers } from 'redux';

import { REQUEST_GIF_CARDS } from '/actions';


const gifCards = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_GIF_CARDS:
      return { ...state, isLoading: true };
    default:
      return state;
  }
};


const rootReducer = combineReducers({
  gifCards,
});


export default rootReducer;
