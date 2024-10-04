// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getStorage } from "firebase/storage"; // Import Storage
<<<<<<< HEAD
import { getFunctions, httpsCallable } from "firebase/functions"; // Importing getFunctions and httpsCallable
=======
>>>>>>> main/frontend

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
const db = getFirestore(app); // Initialize Firestore

// Initialize Firebase Storage
const storage = getStorage(app); // Initialize Storage
<<<<<<< HEAD
// Initialize Firebase

const functions = getFunctions(app); // Exporting the functions instance
const myFunction = httpsCallable(functions, 'parseQuestion');

export { db, storage, myFunction }; // Export Firestore and Storage instances for use in other files
=======

export { db, storage }; // Export Firestore and Storage instances for use in other files
>>>>>>> main/frontend
