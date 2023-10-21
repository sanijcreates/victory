import { initializeApp,getApps, getApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBm4xGVNNAKW60OWIBPbB9lhrs7rcTxJFo",
  authDomain: "hackharvard-b28f4.firebaseapp.com",
  projectId: "hackharvard-b28f4",
  storageBucket: "hackharvard-b28f4.appspot.com",
  messagingSenderId: "455717704672",
  appId: "1:455717704672:web:1b365ef1604c23a36f5185",
  measurementId: "G-DN1TX2MWJ4"
};

// Initialize Firebase
if (getApps().length === 0) initializeApp(firebaseConfig);
export const auth=getAuth(getApp())
export const db=getFirestore(getApp())
