import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: (import.meta as any).env.VITE_APP_FIREBASE_API_KEY,
  authDomain: (import.meta as any).env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: (import.meta as any).env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: (import.meta as any).env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: (import.meta as any).env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: (import.meta as any).env.VITE_APP_FIREBASE_APP_ID,
  measurementId: (import.meta as any).env.VITE_APP_FIREBASE_MEASUREMENT_ID,
  databaseURL: (import.meta as any).env.VITE_APP_FIREBASE_DATABASE_URL
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);