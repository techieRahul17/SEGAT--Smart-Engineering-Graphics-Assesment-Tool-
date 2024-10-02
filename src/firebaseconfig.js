import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions"; // Importing getFunctions and httpsCallable

const firebaseConfig = {
    apiKey: "AIzaSyDQxMpQq-aW3-n6ld2bLsASM6IknMb12PA",
    authDomain: "segat-react-vite.firebaseapp.com",
    projectId: "segat-react-vite",
    storageBucket: "segat-react-vite.appspot.com",
    messagingSenderId: "302421080134",
    appId: "1:302421080134:web:deb20b0c722c3645aeb247"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const functions = getFunctions(app); // Exporting the functions instance
