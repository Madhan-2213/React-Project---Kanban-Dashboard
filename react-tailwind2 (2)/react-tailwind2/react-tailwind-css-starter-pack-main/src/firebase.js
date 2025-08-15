import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAPe7DX01FHBG23uyGQnOr4JjDZfNkULbI",
  authDomain: "zidio-task-management-66051.firebaseapp.com",
  projectId: "zidio-task-management-66051",
  storageBucket: "zidio-task-management-66051.firebasestorage.app",
  messagingSenderId: "50588720779",
  appId: "1:50588720779:web:e7f9df5e62600fc5babe8e",
  measurementId: "G-Q6VWGK7Y1P"
};

// Initialize Firebase (guard for HMR/dev)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Export auth and providers via compat
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();

// Wrapper to keep the same callsite signature
export const signInWithPopup = (authInstance, provider) => authInstance.signInWithPopup(provider);


