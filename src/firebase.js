// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import firebase from "firebase/app";
// import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCg0gWPpmYsnB1O9DcQeIi4LQLEmufQxRg",
  authDomain: "todo-app-867e5.firebaseapp.com",
  projectId: "todo-app-867e5",
  storageBucket: "todo-app-867e5.appspot.com",
  messagingSenderId: "854191331555",
  appId: "1:854191331555:web:9f0223d97d610be183cdd6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
