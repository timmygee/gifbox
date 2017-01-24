import React from 'react';

import { AppBar } from 'react-toolbox/lib/app_bar';
// import classnames from 'classnames/bind';
// import styles from './gif-item-styles.scss';
// const classes = classnames.bind(styles);

const GifItem = (props) => {
  const { url } = props;

  return (
    <div>
      <AppBar>Hi</AppBar>
      <div>
        <img role="presentation" src={ url } />
        Yiewww!
      </div>
    </div>
  );
  // return (
  //   <div>
  //     <AppBar className={classes('dashboard')}>Hi</AppBar>
  //     <div>
  //       <img role="presentation" src={ url } />
  //       Yiewww!
  //     </div>
  //   </div>
  // );
};

export default GifItem;
