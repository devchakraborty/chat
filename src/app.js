import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import * as appActions from './reducers/app/actions';

import store from './store';

import { registerScreens } from './screens';
registerScreens(store, Provider);

export default class App {
  constructor() {
    this.startApp();
    store.subscribe(() => this.onStoreUpdate());
  }

  onStoreUpdate() {
    const state = store.getState();
    const newModal = state.app.get('modal');
    console.log(this.currentModal, '>', newModal);
    if (newModal != this.currentModal) {
      if (newModal == null) this.dismissModal();
      else this.showModal(this.currentModal = newModal);
    }
  }

  showModal(modalName) {
    console.log('showing modal', modalName);
    switch (modalName) {
      case 'login':
        Navigation.showModal({
          screen: 'LoginScreen',
          title: 'Login',
          animationType: 'slide-up'
        });
        break;
      default:
        console.error('Invalid modalName', modalName);
    }
  }

  dismissModal() {
    if (this.currentModal == null) return;
    this.currentModal = null;
    console.log('dismiss');
    Navigation.dismissAllModals({
      animationType: 'slide-down'
    });
  }

  startApp() {
    Navigation.startTabBasedApp({
      tabs: [
        {
          label: 'Chats',
          screen: 'ChatsScreen',
          title: 'Chats'
        },
        {
          label: 'Home',
          screen: 'HomeScreen',
          title: 'Home'
        },
        {
          label: 'Notifications',
          screen: 'NotifsScreen',
          title: 'Notifications'
        }
      ]
    });
  }
}
