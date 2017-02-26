import React, { Component } from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import moment from 'moment';

import LoadingSpinner from '/components/LoadingSpinner';
import GifDialog from '/components/GifDialog';
import styles from '/styles.scss';

// TODO
// 
// File sizes
// Viewport height in desktop mode (enforce height?)
// Font sizes etc

class GifCard extends Component {
  constructor() {
    super();
    this.state = {
      imageLoaded: false,
      dialogActive: false,
    };
  }

  handleImageLoaded() {
    this.setState({ ...this.state, imageLoaded: true });
  }

  toggleDialogActive() {
    const { dialogActive } = this.state;
    this.setState({ ...this.state, dialogActive: !dialogActive });
  }

  render() {
    const { imageLoaded, dialogActive } = this.state;
    const { data } = this.props;
    const { image, created, period } = data;

    const createdDate = moment(created);
    const dateExpression = period === 'daily' ? createdDate.format('ddd D/M/YYYY') : createdDate.format('ddd D/M/YYYY H:mm a');

    return (
      <Card className={ styles['gif-card'] }>
        <CardMedia className={ styles.image } >
          { !imageLoaded && <LoadingSpinner /> }
          <img 
            className={ !imageLoaded && styles.hidden }
            src={ image.thumbnail_url }
            onLoad={ ::this.handleImageLoaded }
          />
        </CardMedia>
        <CardTitle 
          className={ styles.title }
          title={ dateExpression }
          subtitle={ period }
        />
        <Button label="Show full" raised primary onClick={ ::this.toggleDialogActive } />
        <GifDialog
          title={ dateExpression }
          image={ image }
          active={ dialogActive }
          toggleDialogActive={ ::this.toggleDialogActive }
        />
      </Card>
    );
  }
};

GifCard.propTypes = {
  data: React.PropTypes.object,
};

export default GifCard;
