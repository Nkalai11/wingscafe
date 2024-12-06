import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTRXKKLlabGzf8H9YTVVU_D15MQGgEE1o",
  authDomain: "phula-332f3.firebaseapp.com",
  projectId: "phula-332f3",
  storageBucket: "phula-332f3.firebasestorage.app",
  messagingSenderId: "1078929811493",
  appId: "1:1078929811493:web:c9e991fc9ff7ea990877cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Firebase Realtime Database
const database = getDatabase(app);

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, database };
