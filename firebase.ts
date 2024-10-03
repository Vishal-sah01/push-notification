import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
    const firebaseConfig = {
    apiKey: "process.env.local.NEXT_PUBLIC_FIREBASE_KEY",
    authDomain: "push-notification-a0131.firebaseapp.com",
    projectId: "push-notification-a0131",
    storageBucket: "push-notification-a0131.appspot.com",
    messagingSenderId: "418537958637",
    appId: "1:418537958637:web:9295ad8d9540690c2370e4",
    measurementId: "G-5DNW3XLGQ0"
  };

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };