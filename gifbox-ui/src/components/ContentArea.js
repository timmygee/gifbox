import React, { Component } from 'react';
import { Panel } from 'react-toolbox/lib/layout';

import GifGridList from '/components/GifGridList';
import LoadingSpinner from '/components/LoadingSpinner';
import styles from '/styles.scss';


class ContentArea extends Component {
  componentDidMount() {
    const { store } = this.context;

    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });

    // Initial data load
    store.dispatch({
      type: 'FETCH_CARDS',
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { store } = this.context;
    const { content } = store.getState();

    return (
      <Panel className={ styles['content-area'] }>
        { content.isLoading ? <LoadingSpinner /> : <GifGridList /> }
      </Panel>
    );
  }
}


ContentArea.contextTypes = {
  store: React.PropTypes.object,
};


export default ContentArea;
