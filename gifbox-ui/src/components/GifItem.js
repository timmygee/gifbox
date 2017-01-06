import React from 'react';

import { AppBar } from 'react-toolbox/lib/app_bar';

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
};

export default GifItem;
