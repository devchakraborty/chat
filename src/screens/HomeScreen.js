import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';

class HomeScreen extends Component {
  render() {
    return (
      <View style={{flex: 1, padding: 20}}>
        <Text>Home</Text>
      </View>
    )
  }
}

export default connect()(HomeScreen);
