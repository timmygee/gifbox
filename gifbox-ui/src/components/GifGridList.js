import React from 'react';

import GifCard from '/components/GifCard';

import styles from '/styles.scss';


const GifGridList = ({ payload }) => (
  <div className={ styles['gif-grid'] }>
    {
      payload.results.map(item => <GifCard key={ item.id } data={ item } />)
    }
  </div>
);

GifGridList.propTypes = {
  payload: React.PropTypes.object,
};

export default GifGridList;
