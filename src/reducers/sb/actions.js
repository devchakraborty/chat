import sendbird from 'sendbird';
import SendbirdAPI from '../../services/SendbirdAPI';
import Promise from 'bluebird';

export function init() {
  return function(dispatch, getState) {
    const state = getState();
    sendbird.init({
      app_id: '9A2B0F66-F860-4927-B76B-E5089C72998B',
      guest_id: state.fb.getIn(['profile', 'id']),
      user_name: state.fb.getIn(['profile', 'name']),
      image_url: state.fb.getIn(['profile', 'picture', 'data', 'url']),
      successFunc: (data) => {
        dispatch(didInit());
        dispatch(fetchChats());
      },
      errorFunc: (status, error) => {
        console.log('sendbird log in error', status, error);
      }
    });
  }
}

export function didInit() {
  return {
    type: 'sb.didInit'
  };
}

export function createChat({members}) {
  return async function(dispatch, getState) {
    const state = getState();
    const createUserPromises = members.map(member =>
      SendbirdAPI.getOrCreateUser({
        user_id: member,
        nickname: state.fb.getIn(['friends', 'index', member, 'first_name']),
        profile_url: state.fb.getIn(['friends', 'index', member, 'picture', 'data', 'url']),
        issue_access_token: false
      })
    );

    const users = await Promise.all(createUserPromises);

    sendbird.startMessaging(
      members,
      {
        successFunc: data => {
          console.log(data);
        },
        errorFunc: (status, error) => {
          console.log(status, error);
        }
      }
    );
  }
}

export function fetchChats() {
  return async function(dispatch, getState) {
    const state = getState();
    const fbId = state.fb.getIn(['profile', 'id']);
    const groupChannels = await SendbirdAPI.getGroupChannels({
      user_id: fbId,
      member: true,
      order: 'latest_last_message',
      show_empty: true
    });
    dispatch(didFetchChats(groupChannels));
  }
}

export function didFetchChats({ channels, next }) {
  return {
    type: 'sb.didFetchChats',
    chats: channels,
    next
  };
}
