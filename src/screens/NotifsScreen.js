import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';

class NotifsScreen extends Component {
  render() {
    return (
      <View style={{flex: 1, padding: 20}}>
        <Text>Notifs</Text>
      </View>
    )
  }
}

export default connect()(NotifsScreen);
