import React, { Component } from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import moment from 'moment';

import LoadingSpinner from '/components/LoadingSpinner';
import styles from '/styles.scss';


class GifCard extends Component {
  constructor() {
    super();
    this.state = {
      imageLoaded: false,
    };
  }

  handleImageLoaded() {
    this.setState({ imageLoaded: true });
  }

  render() {
    const { imageLoaded } = this.state;
    const { data } = this.props;
    const { image, created, period } = data;

    const createdDate = moment(created);
    const dateExpression = period === 'daily' ? createdDate.format('ddd D/M/YYYY') : createdDate.format('ddd D/M/YYYY H:m a');

    return (
      <Card className={ styles['gif-card'] }>
        <CardMedia className={ styles.image } >
          { !imageLoaded && <LoadingSpinner /> }
          <img className={ !imageLoaded && styles.hidden } src={ image.thumbnail_url } onLoad={ ::this.handleImageLoaded } />
        </CardMedia>
        <CardTitle 
          className={ styles.title }
          title={ dateExpression }
          subtitle={ period }
        />
      </Card>
    );
  }
};

GifCard.propTypes = {
  data: React.PropTypes.object,
};

export default GifCard;
