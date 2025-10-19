import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADn8XumdQHUB6eMVtjkxahqY_kFAtxCC8",
  authDomain: "snappdraft.firebaseapp.com",
  projectId: "snappdraft",
  storageBucket: "snappdraft.firebasestorage.app",
  messagingSenderId: "88069653855",
  appId: "1:88069653855:web:1f072dbba14c46b8c3a2ea",
  measurementId: "G-PGKH45E1T1"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);