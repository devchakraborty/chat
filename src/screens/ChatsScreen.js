import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { Container, Content, List, ListItem } from 'native-base';
import * as appActions from '../reducers/app/actions';
import Immutable from 'immutable';
import store from '../store';

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
    this.state = {
      chats: this._getStoreChats()
    };
    this.storeUnsubscribe = store.subscribe(() => this.onStoreUpdate());
    this.props.navigator.setOnNavigatorEvent((event) => this.onNavigatorEvent(event));
    this.props.dispatch(appActions.appInitialized());
  }

  _getStoreChats() {
    return store.getState().sb.getIn(['chats', 'index']).toList();
  }

  onStoreUpdate() {
    const newChats = this._getStoreChats();
    if (!Immutable.is(this.state.chats, newChats)) {
      this.setState({
        chats: newChats
      });
    }
  }

  componentWillUnmount() {
    this.storeUnsubscribe();
  }

  renderChat(chat) {
    console.log('chat', chat);
    return (
      <ListItem key={chat.channel_url} onPress={() => this.openChat(chat)}>
        <Text ellipsizeMode='tail' numberOfLines={1}>{chat.members.map(member => member.nickname).join(', ')}</Text>
      </ListItem>
    );
  }

  render() {
    return (
      <Container>
        <Content>
          <List dataArray={this.state.chats.toJS()} renderRow={(chat) => this.renderChat(chat)}>
          </List>
        </Content>
      </Container>
    );
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

  openChat(chat) {
    this.props.navigator.push({
      screen: 'ChatScreen',
      title: chat.members.map(member => member.nickname).join(', ')
    });
  }
}

export default connect()(ChatsScreen);
