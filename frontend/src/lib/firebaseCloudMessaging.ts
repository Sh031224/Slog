import firebase from "firebase/app";
import option from "../config/firebase.json";
import "firebase/messaging";

const firebaseCloudMessaging = {
  init: async function () {
    if (!firebase.apps.length) {
      firebase.initializeApp(option);
      try {
        const messaging = firebase.messaging();

        const status = await Notification.requestPermission();
        if (status && status === "granted") {
          const fcm_token = await messaging.getToken();
          if (fcm_token) {
            return fcm_token;
          }
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  }
};
export { firebaseCloudMessaging };
