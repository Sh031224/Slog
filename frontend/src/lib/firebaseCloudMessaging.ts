import localforage from "localforage";
import firebase from "firebase/app";
import option from "../config/firebase.json";
import "firebase/messaging";

const firebaseCloudMessaging = {
  tokenInlocalforage: async () => {
    return await localforage.getItem("fcm_token");
  },

  init: async function () {
    if (!firebase.apps.length) {
      firebase.initializeApp(option);
      try {
        const messaging = firebase.messaging();
        const tokenInLocalForage = await this.tokenInlocalforage();

        if (tokenInLocalForage) {
          return String(tokenInLocalForage);
        }

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
