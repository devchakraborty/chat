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
    default:
      return state;
  }
}
