import React, { Component } from 'react';
import { Panel } from 'react-toolbox/lib/layout';
import { connect } from 'react-redux';

import GifGridList from '/components/GifGridList';
import LoadingSpinner from '/components/LoadingSpinner';

import { fetchCards } from  '/actions';

import styles from '/styles.scss';


class ContentArea extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    // Initial data load
    dispatch({
      type: 'FETCH_CARDS',
    });
  }

  render() {
    const { content } = this.props;

    return (
      <Panel className={ styles['content-area'] }>
        { content.isLoading ? <LoadingSpinner /> : <GifGridList /> }
      </Panel>
    );
  }
}


ContentArea.propTypes = {
  dispatch: React.PropTypes.func,
  content: React.PropTypes.object,
};


const mapStateToProps = (state) => {
  const { content } = state;

  return { content };
};


export default connect(mapStateToProps)(ContentArea);
