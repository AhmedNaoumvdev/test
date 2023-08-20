import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRr2jKf1fjpTbep4948y1rjXYCPIPLpZU",

  authDomain: "delegue-backup.firebaseapp.com",

  projectId: "delegue-backup",

  storageBucket: "delegue-backup.appspot.com",

  messagingSenderId: "338677915497",

  appId: "1:338677915497:web:cf14767c2fa1dac39667f8",

  measurementId: "G-0R4F27XYTN",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
