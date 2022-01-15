import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAh7xkaZfhT2zC0kjE_SfPdm_D7qXH409E",
  authDomain: "arshelf-trials.firebaseapp.com",
  projectId: "arshelf-trials",
  storageBucket: "arshelf-trials.appspot.com",
  messagingSenderId: "687506857529",
  appId: "1:687506857529:web:f7cb3b4cb34b132a97b7e8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const storage = firebase.storage();

export {storage, firebase as default};