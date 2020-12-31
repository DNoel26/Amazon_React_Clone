import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiqXoHiv-vxJ0IzC65ii1af6hJ-ZQYsnA",
  authDomain: "clone-905a7.firebaseapp.com",
  projectId: "clone-905a7",
  storageBucket: "clone-905a7.appspot.com",
  messagingSenderId: "599970272341",
  appId: "1:599970272341:web:058750a9fdcea3361a30dc",
  measurementId: "G-7MMSH67Z07"
};

const firebase_app = firebase.initializeApp(firebaseConfig);

const db = firebase_app.firestore();
const auth = firebase.auth();

export {db, auth};
  
  