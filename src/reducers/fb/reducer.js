import Immutable from 'immutable';
import _ from 'lodash';

const initialState = Immutable.fromJS({
  friends: {
    index: {}
  }
});

export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case 'fb.didLogin':
      return state.set('token', action.token);
    case 'fb.logout':
      return initialState;
    case 'fb.didFetchProfile':
      return state.set('profile', Immutable.fromJS(action.profile));
    case 'fb.didFetchFriends':
      const newIndex = state.getIn(['friends', 'index']).merge(Immutable.fromJS(_.keyBy(action.friends, 'id')));
      return state.setIn(['friends', 'index'], newIndex).setIn(['friends', 'paging'], Immutable.fromJS(action.paging));
    default:
      return state;
  }
}
