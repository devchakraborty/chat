import React, { Component } from 'react';
import {
  View
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, List, ListItem, Text, CheckBox } from 'native-base';
import Immutable from 'immutable';
import _ from 'lodash';
import * as sbActions from '../reducers/sb/actions';

import store from '../store';

class NewChatScreen extends Component {

  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Create',
        id: 'new-chat-create'
      }
    ]
  };

  static navigatorStyle = {
    tabBarHidden: true
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: Immutable.Set(),
      friends: this._getStoreFriends()
    };
    this.storeUnsubscribe = store.subscribe(() => this.onStoreUpdate());
    this.props.navigator.setOnNavigatorEvent((event) => this.onNavigatorEvent(event));
  }

  _getStoreFriends() {
    return store.getState().fb.getIn(['friends', 'index']).toList();
  }

  onStoreUpdate() {
    const newFriends = this._getStoreFriends();
    if (!Immutable.is(newFriends, this.state.friends)) {
      this.setState({
        friends: newFriends
      });
    }
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'new-chat-create') {
        this.props.dispatch(sbActions.createChat({
          members: this.state.selected.toList().toJS()
        }));
      }
    }
  }

  toggleFriend(id) {
    const selected = this.state.selected;
    if (selected.includes(id)) {
      this.setState({
        selected: selected.delete(id)
      });
    } else {
      this.setState({
        selected: selected.add(id)
      });
    }
  }

  componentWillUnmount() {
    this.storeUnsubscribe();
  }

  renderFriend(user) {
    return (
      <ListItem key={user.id} onPress={() => this.toggleFriend(user.id)}>
        <Text>{user.name}</Text>
        <CheckBox checked={this.state.selected.includes(user.id)} />
      </ListItem>
    );
  }

  render() {
    return (
      <Container>
        <Content>
          <List dataArray={this.state.friends.toJS()} renderRow={(friend) => this.renderFriend(friend)}>
          </List>
        </Content>
      </Container>
    );
  }
}

export default connect()(NewChatScreen);
