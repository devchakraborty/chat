export function appInitialized() {
  return async function(dispatch, getState) {
    const state = getState();
    if (!state.fb.has('token')) {
      dispatch(displayLogin());
    }
  }
}

export function displayLogin() {
  return { type: 'app.displayLogin' };
}

export function hideModal() {
  return { type: 'app.hideModal' };
}
