import * as Notifications from "expo-notifications";

export const initializeNotifications = async() => {
    await Notifications.requestPermissionsAsync();

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
          // priority: 'high'
        }),
    });
};