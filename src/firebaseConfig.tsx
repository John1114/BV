// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0E5dYmb9dA-X0XA0T9E_A2GLcce45Vd4",
  authDomain: "bruno-ventures-v2.firebaseapp.com",
  projectId: "bruno-ventures-v2",
  storageBucket: "bruno-ventures-v2.appspot.com",
  messagingSenderId: "889526829744",
  appId: "1:889526829744:web:83bef1617e6ddf92053175"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app}