// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmQ4Gki9uq7JmXKuRuzYtokjMdCaul6VA",
  authDomain: "cps406project.firebaseapp.com",
  databaseURL: "https://cps406project-default-rtdb.firebaseio.com",
  projectId: "cps406project",
  storageBucket: "cps406project.firebasestorage.app",
  messagingSenderId: "914014838460",
  appId: "1:914014838460:web:b4ff14a88a0c5e958dbab9",
  measurementId: "G-0XS6TSF48H"
};

// Initialize Firebase
const cong = initializeApp(firebaseConfig);
const analytics = getAnalytics(cong);

export default cong;
// Now you can use Firebase services in your React app!