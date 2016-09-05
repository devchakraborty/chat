import React, { Component } from 'react';

import {
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
  Text
} from 'react-native';

export default class LoginButton extends Component {
  render() {
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    return (
      <TouchableElement style={{backgroundColor: 'blue'}} onPress={this.props.onPress}>
        <View style={{flex:1}}>
          <Text style={{color: 'white'}}>Login with Facebook</Text>
        </View>
      </TouchableElement>
    );
  }
}
