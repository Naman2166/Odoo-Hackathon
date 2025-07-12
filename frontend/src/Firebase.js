// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7_GfvLVwn-gOPm8ncC5jge_e82WWxHdY",
  authDomain: "stack-it-a8b52.firebaseapp.com",
  projectId: "stack-it-a8b52",
  storageBucket: "stack-it-a8b52.firebasestorage.app",
  messagingSenderId: "911357937308",
  appId: "1:911357937308:web:4c5c4bf18df12c98ff4f59",
  measurementId: "G-G2J28KEQL1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export {auth, provider};