import React from 'react';

import GifCard from '/components/GifCard';

import styles from '/styles.scss';


const GifGridList = ({ payload }) => (
  <div className={ styles['gif-grid'] }>
    {
      payload.results.map((item, index) => <GifCard key={ index } url={ item.image.thumbnail } />)
    }
  </div>
);

GifGridList.propTypes = {
  payload: React.PropTypes.object,
};

export default GifGridList;
