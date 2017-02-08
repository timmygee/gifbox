import React from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

import styles from '/styles.scss';


const GifCard = (props) => {
  const { url } = props;

  return (
    <Card className={ styles['gif-card'] }>
      <CardTitle>My title</CardTitle>
      <CardMedia
        className={ styles.image }
        image={ url }
      />
    </Card>
  );
};

GifCard.propTypes = {
  url: React.PropTypes.string,
};

export default GifCard;
