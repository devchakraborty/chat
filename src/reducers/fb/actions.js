import { hideModal } from '../app/actions';
import { init as sbInit } from '../sb/actions';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

const FB_PROFILE_FIELDS = ['id', 'name', 'first_name', 'last_name', 'picture'];

export function login() {
  return async function(dispatch, getState) {
    const state = getState();
    const result = await LoginManager.logInWithReadPermissions(['public_profile', 'user_friends']);
    if (result.isCancelled) {
      console.error(result);
    } else {
      const data = await AccessToken.getCurrentAccessToken();
      const token = data.accessToken.toString();
      dispatch(didLogin(token));
      dispatch(hideModal());
      dispatch(fetchProfile());
      dispatch(fetchFriends());
    }
  }
}

export function didLogin(token) {
  return {
    type: 'fb.didLogin',
    token
  };
}

export function logout() {
  return {
    type: 'fb.logout'
  };
}

export function fetchProfile() {
  return async function(dispatch, getState) {
    const profileRequest = new GraphRequest(
      'me',
      {
        parameters:
        {
          fields: {
            string: FB_PROFILE_FIELDS.join(',')
          }
        }
      },
      (error, profile) => {
        if (error) console.error(error);
        else {
          console.log('profile', profile);
          dispatch(didFetchProfile(profile));
          dispatch(sbInit());
        }
      }
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  }
}

export function didFetchProfile(profile) {
  return {
    type: 'fb.didFetchProfile',
    profile
  };
}

export function fetchFriends() {
  return async function(dispatch, getState) {
    const friendsRequest = new GraphRequest(
      'me/friends',
      {
        parameters:
        {
          fields: {
            string: FB_PROFILE_FIELDS.join(',')
          }
        }
      },
      (error, result) => {
        if (error) console.error(error);
        else {
          console.log('friends', result);
          dispatch(didFetchFriends(result));
        }
      }
    );
    new GraphRequestManager().addRequest(friendsRequest).start();
  }
}

export function didFetchFriends({ data, paging }) {
  return {
    type: 'fb.didFetchFriends',
    friends: data,
    paging
  };
}
