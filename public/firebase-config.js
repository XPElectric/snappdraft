import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js';  // New: Auth import

const firebaseConfig = {
  apiKey: "AIzaSyADn8XumdQHUB6eMVtjkxahqY_kFAtxCC8",  // Replace with your full config from console
  authDomain: "snappdraft.firebaseapp.com",
  projectId: "snappdraft",
  storageBucket: "snappdraft.firebasestorage.app",
  messagingSenderId: "88069653855",
  appId: "1:88069653855:web:1f072dbba14c46b8c3a2ea",
  measurementId: "G-PGKH45E1T1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);  // Export for modular use

