import fetch from 'whatwg-fetch';


// Converts a '/' separated path into a consistent format.
// Trailing slashes are stripped and there will always be a single slash at the
// start
export const normalisePath = path => (
  path
    .split('/')
    .reduce((reduced, crumb) => {
      if (crumb) {
        reduced.push(crumb);
      }
      return reduced;
    }, [''])
    .join('/')
);


// Wrapper that allows fetch to be called with a path relative to the host
export const fetchRelative = (host = window.location.host) =>
  (relPath, options = {}) =>
    fetch(`${window.location.protocol}//${host}${this.normalisePath(relPath)}`, options);
