//import firebase from 'firebase/app';
//import 'firebase/auth';
//import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBigRpFWHBWv_hu7omMNTOgsYRIl9ioOZs",
  authDomain: "todo-app-64b22.firebaseapp.com",
  databaseURL: "https://todo-app-64b22-default-rtdb.firebaseio.com",
  projectId: "todo-app-64b22",
  storageBucket: "todo-app-64b22.appspot.com",
  messagingSenderId: "337552102081",
  appId: "1:337552102081:web:e87ff5ddcd741662a7fa40",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export {auth};
export default db;