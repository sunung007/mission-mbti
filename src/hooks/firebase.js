// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSjk3gBQ79dSAZDFwJhipmsprWXh_JItU",
  authDomain: "mission-mbti.firebaseapp.com",
  projectId: "mission-mbti",
  storageBucket: "mission-mbti.appspot.com",
  messagingSenderId: "337035542333",
  appId: "1:337035542333:web:0ac6c7541054c7082ccf54",
  measurementId: "G-7PGW2ZF57V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
