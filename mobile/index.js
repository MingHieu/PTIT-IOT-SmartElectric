/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {onDisplayNotification} from './src/notification';

// Register background handler
messaging().setBackgroundMessageHandler(onDisplayNotification);

AppRegistry.registerComponent(appName, () => App);
