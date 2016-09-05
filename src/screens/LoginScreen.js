import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { LoginButton } from '../components';
import * as fbActions from '../reducers/fb/actions';

class LoginScreen extends Component {
  render() {
    return (
      <View style={{flex: 1, padding: 20}}>
        <LoginButton onPress={() => this.login()} />
      </View>
    )
  }

  login() {
    this.props.dispatch(fbActions.login());
  }
}

export default connect()(LoginScreen);
