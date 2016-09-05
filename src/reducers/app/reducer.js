  import Immutable from 'immutable';

  const initialState = Immutable.fromJS({
    modal: undefined
  });

  export default function app(state = initialState, action = {}) {
    switch (action.type) {
      case 'app.displayLogin':
        return state.set('modal', 'login');
      case 'app.hideModal':
        return state.set('modal', undefined);
      default:
        return state;
    }
  }
