import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATx_pfWZpe2-L3QNi3UKLgEZ6h8AlTkCI",
  authDomain: "thesis-management-5e662.firebaseapp.com",
  projectId: "thesis-management-5e662",
  storageBucket: "thesis-management-5e662.appspot.com",
  messagingSenderId: "5901023680",
  appId: "1:5901023680:web:4217c52f0d68234b3a7025",
};

let app;
if (!getApps().length) {
  // Initialize Firebase only if there are no apps already initialized
  app = initializeApp(firebaseConfig);
} else {
  // Use the already initialized app
  app = getApps()[0];
}

// Initialize Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);
const database = getDatabase(app);

export { app, auth, firestore, database };
