import { Navigation } from 'react-native-navigation';

import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import ChatsScreen from './ChatsScreen';
import NotifsScreen from './NotifsScreen';
import NewChatScreen from './NewChatScreen';
import ChatScreen from './ChatScreen';

export function registerScreens(store, Provider) {
  Navigation.registerComponent('LoginScreen', () => LoginScreen, store, Provider);
  Navigation.registerComponent('HomeScreen', () => HomeScreen, store, Provider);
  Navigation.registerComponent('ChatsScreen', () => ChatsScreen, store, Provider);
  Navigation.registerComponent('NotifsScreen', () => NotifsScreen, store, Provider);
  Navigation.registerComponent('NewChatScreen', () => NewChatScreen, store, Provider);
  Navigation.registerComponent('ChatScreen', () => ChatScreen, store, Provider);
}
