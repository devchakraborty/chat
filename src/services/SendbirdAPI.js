const API_TOKEN = 'c9d0ab0c790abb2a4f7fcc34457a9e70f73888be'; // TODO: VERY INSECURE

export default class SendbirdAPI {
  static request({ path, method, params }) {
    var finalPath = path;
    if (method == 'GET' && params) {
      const pairs = [];
      for (let key of Object.keys(params)) {
        const value = params[key];
        pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      }
      if (pairs.length > 0) {
        finalPath += '?' + pairs.join('&');
      }
    }
    return fetch(`https://api.sendbird.com/v3/${finalPath}`, {
      method,
      headers: {
        'Api-Token': API_TOKEN,
        'Content-Type': 'application/json'
      },
      body: (params && method == 'POST') ? JSON.stringify(params) : null
    })
    .then(response => response.json());
  }

  static get({ path, params }) {
    return SendbirdAPI.request({ path, params, method: 'GET' });
  }

  static post({ path, params }) {
    return SendbirdAPI.request({ path, params, method: 'POST' });
  }

  static createUser(params) {
    return SendbirdAPI.post({ path: 'users', params });
  }

  static getUser(id) {
    return SendbirdAPI.get({ path: `users/${id}` });
  }

  static getOrCreateUser(params) {
    return SendbirdAPI.getUser(params.user_id).then((user) => {
      if (!user.error) return user;
      return SendbirdAPI.createUser(params);
    });
  }

  static getGroupChannels(params) {
    return SendbirdAPI.get({ path: 'group_channels', params });
  }
}
