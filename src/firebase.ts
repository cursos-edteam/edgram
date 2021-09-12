// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import IFirebase from './interfaces/Firebase';

declare global {
  interface Window {
    recaptchaVerifier: any,
    confirmationResult: any
  }
}
// Your web app's Firebase configuration
const firebaseConfig: IFirebase = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_DOMAIN,
  projectId: process.env.VUE_APP_PROJECTID,
  storageBucket: process.env.VUE_APP_BUCKET,
  messagingSenderId: process.env.VUE_APP_SENDERID,
  appId: process.env.VUE_APP_ID,
};

firebase.initializeApp(firebaseConfig);
firebase.auth().languageCode = 'es';

const db = firebase.firestore();

export {
  firebase,
  db,
};
