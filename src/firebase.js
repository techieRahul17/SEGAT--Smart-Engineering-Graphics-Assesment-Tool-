// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getStorage } from "firebase/storage"; // Import Storage
import { getFunctions, httpsCallable } from "firebase/functions"; // Importing getFunctions and httpsCallable

const firebaseConfig = {
    apiKey: "AIzaSyDzSuU7XZhwPNbX8dRh7MiClK9213nobZQ",
    authDomain: "segatfin.firebaseapp.com",
    projectId: "segatfin",
    storageBucket: "segatfin.appspot.com",
    messagingSenderId: "781824355902",
    appId: "1:781824355902:web:47bd665a92206d4a22eb6f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app); // Initialize Firestore

// Initialize Firebase Storage
export const storage = getStorage(app); // Initialize Storage

// Initialize Firebase

const functions = getFunctions(app); // Exporting the functions instance
export const myFunction = httpsCallable(functions, 'parseQuestion');