import ApiConsumer from '/api-consumer';


const HOST = 'localhost:8000';

const apiConsumer = new ApiConsumer(HOST);


// Action creators //

// Authentication
export const REQUEST_AUTH_TOKEN = 'REQUEST_AUTH_TOKEN';
const requestAuthToken = () => ({ type: REQUEST_AUTH_TOKEN });

export const RECEIVE_AUTH_TOKEN = 'RECEIVE_AUTH_TOKEN';
const receiveAuthToken = payload => ({
  type: RECEIVE_AUTH_TOKEN,
  payload,
});

export const RECEIVE_AUTH_TOKEN_ERROR = 'RECEIVE_AUTH_TOKEN_ERROR';
const receiveAuthTokenError = error => ({
  type: RECEIVE_AUTH_TOKEN_ERROR,
  error,
});

export const fetchAuthToken = (username, password) => (dispatch) => {
  dispatch(requestAuthToken());

  return apiConsumer
    .oAuthenticate('obtain-auth-token', username, password)
    .catch(error => dispatch(receiveAuthTokenError(error)))
    .then(json => dispatch(receiveAuthToken(json)));
};


// Gif cards
export const REQUEST_GIF_CARDS = 'REQUEST_GIF_CARDS';
const requestGifCards = () => ({ type: REQUEST_GIF_CARDS });

export const RECEIVE_GIF_CARDS = 'RECEIVE_GIF_CARDS';
const receiveGifCards = payload => ({
  type: RECEIVE_GIF_CARDS,
  payload,
});

export const RECEIVE_GIF_CARDS_ERROR = 'RECEIVE_GIF_CARDS_ERROR';
const receiveGifCardsError = error => ({
  type: RECEIVE_GIF_CARDS_ERROR,
  error,
});

export const fetchGifCards = (queryParams) => (dispatch) => {
  dispatch(requestGifCards());

  return apiConsumer
    .get('/gifs', queryParams)
    .catch(error => dispatch(receiveGifCardsError(error)))
    .then(json => dispatch(receiveGifCards(json)));
};
