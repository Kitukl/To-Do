// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDMm5M4jMZTTGEFb1Wfu459jW4qnoZ8l6Y",
    authDomain: "to-do-de98c.firebaseapp.com",
    projectId: "to-do-de98c",
    storageBucket: "to-do-de98c.firebasestorage.app",
    messagingSenderId: "850506681608",
    appId: "1:850506681608:web:b323893fafc01e5506f0bd",
    measurementId: "G-91QM8FTMM4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);