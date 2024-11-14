// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQ0zpHB0jciAgmrUZsb8AaP9ms9bw9uN0",
  authDomain: "social-app-f6845.firebaseapp.com",
  projectId: "social-app-f6845",
  storageBucket: "social-app-f6845.appspot.com",
  messagingSenderId: "992178790539",
  appId: "1:992178790539:web:7312b803c3b409ac9bb48e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)