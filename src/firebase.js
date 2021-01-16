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


const db = firebaseApp.firestore();
const auth = firebase.auth();

export auth;
export default db;