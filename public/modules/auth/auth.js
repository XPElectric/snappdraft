import { auth } from '../../firebase-config.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('authForm');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const submitBtn = document.getElementById('submitBtn');
  const signupBtn = document.getElementById('signupBtn');
  const errorMsg = document.getElementById('errorMsg');
  let isSignup = false;

  // Toggle mode
  signupBtn.addEventListener('click', () => {
    isSignup = !isSignup;
    submitBtn.textContent = isSignup ? 'Sign Up' : 'Login';
    signupBtn.textContent = isSignup ? 'Switch to Login' : 'Sign Up';
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMsg.classList.add('hidden');
    const emailVal = email.value;
    const passwordVal = password.value;

    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, emailVal, passwordVal);
      } else {
        await signInWithEmailAndPassword(auth, emailVal, passwordVal);
      }
      window.location.href = '/';
    } catch (error) {
      errorMsg.textContent = error.message;
      errorMsg.classList.remove('hidden');
    }
  });

  // Auto-redirect if already logged in
  onAuthStateChanged(auth, (user) => {
    if (user) window.location.href = '/';
  });
});