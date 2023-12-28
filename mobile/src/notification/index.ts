import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';

export async function onDisplayNotification(
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) {
  console.log(remoteMessage);
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  // Display a notification
  await notifee.displayNotification({
    title: remoteMessage.notification?.title,
    body: remoteMessage.notification?.body,
    android: {
      channelId,
      smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
      importance: AndroidImportance.HIGH,
    },
  });
}
