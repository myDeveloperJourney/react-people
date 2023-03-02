// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, signInWithPopup, signOut, getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUMy2AeOh33lx8Q7DW4SNcT0Q1t2YHI6o",
  authDomain: "react-people-apps-9cd50.firebaseapp.com",
  projectId: "react-people-apps-9cd50",
  storageBucket: "react-people-apps-9cd50.appspot.com",
  messagingSenderId: "1024338265604",
  appId: "1:1024338265604:web:c6e6cb8e859921e2191751"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Config the provider - Google
const provider = new GoogleAuthProvider();
// Create a reference to our firebase authentication instance
const auth = getAuth(app);

// Config login and logout workflows
function login() {
    return signInWithPopup(auth, provider);
}

function logout() {
    return signOut(auth);
}

// Export functionality so we can access it inside of React
export { login, logout, auth };