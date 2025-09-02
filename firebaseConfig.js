import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyDuLS6ALSiGw-2Cl0VTGi2oTVdWdYPDgSg",
  authDomain: "drosera-c1b4a.firebaseapp.com",
  projectId: "drosera-c1b4a",
  storageBucket: "drosera-c1b4a.firebasestorage.app",
  messagingSenderId: "1001278888422",
  appId: "1:1001278888422:web:d8c5905e5bc534e3fede27",
  measurementId: "G-0VQR2KCF77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore instance
export const db = getFirestore(app);
