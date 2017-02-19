import React, { Component } from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

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
    console.log('image loaded')
    this.setState({ imageLoaded: true });
  }

  render() {
    const { url } = this.props;
    const { imageLoaded } = this.state;

    return (
      <Card className={ styles['gif-card'] }>
        { !imageLoaded && <LoadingSpinner /> }
        { imageLoaded && <CardTitle>My title</CardTitle> }
        <CardMedia className={ imageLoaded ? styles.image : styles.hidden } >
          <img src={ url } onLoad={ ::this.handleImageLoaded } />
        </CardMedia>
      </Card>
    );
  }
};

GifCard.propTypes = {
  url: React.PropTypes.string,
};

export default GifCard;
