import Immutable from 'immutable';
import _ from 'lodash';

const initialState = Immutable.fromJS({
  chats: {
    index: {}
  }
});

export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case 'sb.didInit':
      return state.set('connected', true);
    case 'sb.didFetchChats':
      var newIndex = state.getIn(['chats', 'index']);
      for (let chat of action.chats) {
        newIndex = newIndex.set(chat.channel_url, Immutable.fromJS(chat));
      }
      return state.setIn(['chats', 'index'], newIndex).setIn(['chats', 'next'], action.next);
    default:
      return state;
  }
}
