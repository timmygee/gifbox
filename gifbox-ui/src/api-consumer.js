import 'whatwg-fetch';


class ApiConsumer {
  constructor(host = window.location.host, baseEndpointPath = '/api') {
    this.baseEndpoint = `${window.location.protocol}//${host}${ApiConsumer.normalisePath(baseEndpointPath)}`;
    this.host = host;
    this.authToken = null;
  }

  // Converts a '/' separated path into a consistent format.
  // Trailing slashes are stripped and there will always be a single slash at the
  // start
  static normalisePath(path) {
    return path
      .split('/')
      .reduce((reduced, crumb) => {
        if (crumb) {
          reduced.push(crumb);
        }
        return reduced;
      }, [''])
      .join('/');
  }

  static get headersBase() {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip, deflate',
      Connection: 'keep-alive',
      'User-Agent': 'GifBoxUI/0.1',
    };
  }

  get authTokenHeaders() {
    return this.authToken ?
      { Authorization: `Token ${this.authToken}` } :
      {};
  }

  setAuthToken(authToken) {
    this.authToken = authToken;
  }

  get(path = '/', data = {}, headers = {}) {
    // Implements a GET request in all its glory
    const url = new URL(`${this.baseEndpoint}${ApiConsumer.normalisePath(path)}/`);

    // Turn any data to query args
    Object.keys(data)
      .forEach(key => url.searchParams.append(key, data[key]));

    return fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: { ...ApiConsumer.headersBase, ...this.authTokenHeaders, ...headers },
    })
    .catch((error) => {
      console.error(`Error when GETting ${url}`, error); // eslint-disable-line no-console
      throw error;
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`API error ${response.status} (${response.statusText})`);
      }
      return response.json();
    });
  }

  post(path = '/', data = {}, headers = {}) {
    const url = `${this.baseEndpoint}${ApiConsumer.normalisePath(path)}/`;
    console.log('POST', data)
    return fetch(url, {
      method: 'POST',
      redirect: 'follow',
      headers: { ...ApiConsumer.headersBase, ...this.authTokenHeaders, ...headers },
      body: JSON.stringify(data),
    })
    .catch((error) => {
      console.error(`Error when POSTing ${url}`, error); // eslint-disable-line no-console
      throw error;
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`API error ${response.status} (${response.statusText})`);
      }
      return response.json();
    });
  }

  oAuthenticate(relAuthPath, username, password) {
    // Takes a username and password and stores the auth token internally for use in
    // future requests
    return this.post(relAuthPath, { username, password })
      .then((json) => {
        this.setAuthToken(json.token);
      });
  }
}

export default ApiConsumer;
