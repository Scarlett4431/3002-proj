import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyCRKYJ74lpZVHPfjjztagkCubTQi9_-aaw",
    authDomain: "breadsplit.firebaseapp.com",
    databaseURL: "https://breadsplit-default-rtdb.firebaseio.com",
    projectId: "breadsplit",
    storageBucket: "breadsplit.appspot.com",
    messagingSenderId: "1045899544588",
    appId: "1:1045899544588:web:01f88ac61fee8256698629"
  };

export const myFirebase = firebase.initializeApp(firebaseConfig);
