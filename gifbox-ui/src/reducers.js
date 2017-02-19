import { combineReducers } from 'redux';

import {
  REQUEST_AUTH_TOKEN, RECEIVE_AUTH_TOKEN, RECEIVE_AUTH_TOKEN_ERROR,
  REQUEST_GIF_CARDS, RECEIVE_GIF_CARDS, RECEIVE_GIF_CARDS_ERROR,
} from '/actions';


const oAuthInitial = {
  authenticated: false,
  authenticating: false,
  error: null,
};

const oAuth = (state = oAuthInitial, action) => {
  const { type, error } = action;

  switch (type) {
    case REQUEST_AUTH_TOKEN:
      return { ...state, authenticating: true, error: null };
    case RECEIVE_AUTH_TOKEN:
      return { ...state, authenticating: false, authenticated: true };
    case RECEIVE_AUTH_TOKEN_ERROR: {
      return { ...state, authenticating: false, error };
    }
    default:
      return state;
  }
};


const gifCardsInitial = {
  loading: true,
  payload: null,
  error: null,
};

const gifCards = (state = gifCardsInitial, action) => {
  const { type, payload, error } = action;

  switch (type) {
    case REQUEST_GIF_CARDS:
      return { ...state, loading: true, error: null };
    case RECEIVE_GIF_CARDS:
      return { ...state, loading: false, payload };
    case RECEIVE_GIF_CARDS_ERROR: {
      return { ...state, loading: false, error };
    }
    default:
      return state;
  }
};


const rootReducer = combineReducers({
  gifCards,
  oAuth,
});


export default rootReducer;
