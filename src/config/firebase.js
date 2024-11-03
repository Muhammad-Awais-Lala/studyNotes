// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBj5v-ju3SzwPXyYKawCfSU8p1KlX9-hLc",
  authDomain: "todo-demo-practice.firebaseapp.com",
  projectId: "todo-demo-practice",
  storageBucket: "todo-demo-practice.appspot.com",
  messagingSenderId: "649442795193",
  appId: "1:649442795193:web:61cac1032af63815f4c568",
  measurementId: "G-TB1F5F3V43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 getAnalytics(app);

//For Authentication 
const auth = getAuth(app);
// To store data on fire store
const firestore = getFirestore();
// to store files on firebase
const storage = getStorage(app);

export {auth,firestore,storage}