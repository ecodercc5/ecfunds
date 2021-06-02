import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

import { FIREBASE_CONFIG } from "./config/firebase";

firebase.initializeApp(FIREBASE_CONFIG);

// use auth emulator
if (process.env.NODE_ENV === "development") {
  firebase.auth().useEmulator("http://localhost:9099");
}

export { firebase };
