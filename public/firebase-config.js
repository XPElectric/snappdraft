import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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
<<<<<<< HEAD
export const db = getFirestore(app);
=======
export const db = getFirestore(app);
>>>>>>> 7ee0cccef36b7c55dda9d822b1f2d31a09fe9e9a
