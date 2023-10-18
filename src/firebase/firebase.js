import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

// const firebaseConfig = {
//     apiKey: "AIzaSyCRKYJ74lpZVHPfjjztagkCubTQi9_-aaw",
//     authDomain: "breadsplit.firebaseapp.com",
//     databaseURL: "https://breadsplit-default-rtdb.firebaseio.com",
//     projectId: "breadsplit",
//     storageBucket: "breadsplit.appspot.com",
//     messagingSenderId: "1045899544588",
//     appId: "1:1045899544588:web:01f88ac61fee8256698629"
//   };
const firebaseConfig = {
  apiKey: "AIzaSyDjLVK_NsVQN2a7KkeCGJMw_fbDrpTeRLY",
  authDomain: "smart-household-collaboration.firebaseapp.com",
  databaseURL: "https://smart-household-collaboration-default-rtdb.firebaseio.com",
  projectId: "smart-household-collaboration",
  storageBucket: "smart-household-collaboration.appspot.com",
  messagingSenderId: "364471469906",
  appId: "1:364471469906:web:d45d4683a8a87076d45c8b",
  measurementId: "G-Z9TEGCN3JC"
};
export const myFirebase = firebase.initializeApp(firebaseConfig);
