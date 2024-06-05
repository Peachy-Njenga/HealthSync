// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCM6ppv-P5MDhV38AxCpnDj_soKe5CgjLo",
  authDomain: "healthsync-b803c.firebaseapp.com",
  projectId: "healthsync-b803c",
  storageBucket: "healthsync-b803c.appspot.com",
  messagingSenderId: "572917930824",
  appId: "1:572917930824:web:325e6f2871ed3d7271717d",
  measurementId: "G-30LGTHNH7Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
