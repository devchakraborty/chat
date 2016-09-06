import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';
import Immutable from 'immutable';

class ChatScreen extends Component {
  static navigatorStyle = {
    tabBarHidden: true
  };

  constructor(props) {
    super(props);
    this.state = {
      messages: Immutable.List()
    };
  }

  sendMessages(messages) {
    const newMessages = Immutable.fromJS(messages);
    const newState = newMessages.push(...this.state.messages);
    this.setState({
      messages: newState
    });
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages.toJS()}
        onSend={messages => this.sendMessages(messages)}
        user={{_id:1}}
      />
    );
  }
}

export default connect()(ChatScreen);
