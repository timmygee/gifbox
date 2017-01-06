import React from 'react';
import ReactDOM from 'react-dom';

// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
// // import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';

// import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './App';

// Needed to bring in main styles, roboto font etc
import './styles/main.scss';


// const Main = () => (
//   <MuiThemeProvider muiTheme={ getMuiTheme(darkBaseTheme) }>
//     <App />
//   </MuiThemeProvider>
// );
const Main = () => (
  <App />
);

ReactDOM.render(
  <Main />,
  document.getElementById('root'),
);
