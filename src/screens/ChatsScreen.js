import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Container, Content, List, ListItem } from 'native-base';
import * as appActions from '../reducers/app/actions';

class ChatsScreen extends Component {
  static navigatorButtons = {
    rightButtons: [
      {
        title: 'New',
        id: 'new-chat'
      }
    ]
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent((event) => this.onNavigatorEvent(event));

    this.props.dispatch(appActions.appInitialized());
  }

  render() {
    return (
      <View style={{flex: 1, padding: 20}}>
        <Text>Chats</Text>
      </View>
    )
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'new-chat') {
        this.props.navigator.push({
          screen: 'NewChatScreen'
        });
      }
    }
  }
}

export default connect()(ChatsScreen);
