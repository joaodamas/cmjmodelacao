import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCyfPleYCf9S0soVLRpmwenLCqgY9WxRi0",
  authDomain: "cmjmodelacao-jpproject.firebaseapp.com",
  projectId: "cmjmodelacao-jpproject",
  storageBucket: "cmjmodelacao-jpproject.firebasestorage.app",
  messagingSenderId: "782073069650",
  appId: "1:782073069650:web:030762de93d25fcc60df8b",
  measurementId: "G-TDDQB5SYXB"
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

let analyticsPromise: Promise<Analytics | null> | null = null;

export function getFirebaseAnalytics() {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }

  analyticsPromise ??= isSupported()
    .then((supported) => (supported ? getAnalytics(firebaseApp) : null))
    .catch(() => null);

  return analyticsPromise;
}
