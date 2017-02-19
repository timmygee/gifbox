import React, { Component } from 'react';

import Input from 'react-toolbox/lib/input';


class LoginForm extends Component {
  state = {
    username: '',
    password: '',
  };

  onFieldChanged(event) {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  }

  onSubmit(event) {

  }

  render() {
    return (
      <form onChange={::this.onFieldChanged} onSubmit={::this.onSubmit}>
        <Input
          type='text'
          label='Username'
          name='username'
          value={this.state.name}
        />
        <Input
          type='password'
          label='Password'
          name='username' 
          value={this.state.password}
        />
      </form>
    );
  }
}

export default LoginForm;
