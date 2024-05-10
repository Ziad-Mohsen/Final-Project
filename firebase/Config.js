import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAcxqFz0VFFazkx7p8wZ4Uah1etZG41Vrs",
  authDomain: "software-project-72b11.firebaseapp.com",
  projectId: "software-project-72b11",
  storageBucket: "software-project-72b11.appspot.com",
  messagingSenderId: "480663771821",
  appId: "1:480663771821:web:1a9e7a3cebc3dfb3220424",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { app, db, auth };
