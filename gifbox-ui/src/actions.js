import { fetchRelative } from '/utils';


const HOST = 'localhost:8000';

const fetcher = fetchRelative(HOST);


// Action creators
export const REQUEST_GIF_CARDS = 'REQUEST_GIF_CARDS';
const requestGifCards = () => ({ type: REQUEST_GIF_CARDS });


export const RECEIVE_GIF_CARDS = 'RECEIVE_GIF_CARDS';
const receiveGifCards = json => ({
  type: RECEIVE_GIF_CARDS,
  gifCards: json,
});


export const fetchGifCards = () => (dispatch) => {
  dispatch(requestGifCards());

  return fetcher('/api/gifs')
    .then(response => response.json)
    .then() // TODO: Make an apiConsumer class
};


