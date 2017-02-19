import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'react-toolbox/lib/layout';

import { fetchAuthToken } from  '/actions';
import AppInterface from '/components/AppInterface';
import LoadingSpinner from '/components/LoadingSpinner';
import styles from '/styles.scss';


class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    // Authenticate with REST API
    dispatch(fetchAuthToken('tim', 'testings'));
  }

  render() {
    const { oAuth } = this.props;
    const { authenticated } = oAuth;

    return (
      <Layout className={ styles.layout }>
        { authenticated ? <AppInterface /> : <LoadingSpinner /> }
      </Layout>
    );
  }
}

App.propTypes = {
  dispatch: React.PropTypes.func,
  oAuth: React.PropTypes.object,
};

const mapStateToProps = (state) => {
  const { oAuth } = state;
  return { oAuth };
};

export default connect(mapStateToProps)(App);
