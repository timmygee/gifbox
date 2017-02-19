import React, { Component } from 'react';
import { Panel } from 'react-toolbox/lib/layout';
import { connect } from 'react-redux';

import GifGridList from '/components/GifGridList';
import LoadingSpinner from '/components/LoadingSpinner';

import { fetchGifCards } from  '/actions';

import styles from '/styles.scss';


class ContentArea extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    // Initial data load
    dispatch(fetchGifCards());
  }

  render() {
    const { gifCards } = this.props;

    return (
      <Panel className={ styles['content-area'] }>
        { gifCards.loading ? <LoadingSpinner /> : <GifGridList payload={ gifCards.payload } /> }
      </Panel>
    );
  }
}


ContentArea.propTypes = {
  dispatch: React.PropTypes.func,
  gifCards: React.PropTypes.object,
};


const mapStateToProps = (state) => {
  const { gifCards } = state;
  return { gifCards };
};


export default connect(mapStateToProps)(ContentArea);
