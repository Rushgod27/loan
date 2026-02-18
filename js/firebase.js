import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import { getAuth } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  initializeFirestore,
  enableIndexedDbPersistence
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCX4nJv28LRTtCcH3sjj-LUiXzYfxK3SDM",
  authDomain: "loan-management-system-a5bd8.firebaseapp.com",
  projectId: "loan-management-system-a5bd8",
  storageBucket: "loan-management-system-a5bd8.appspot.com",
  messagingSenderId: "29727312343",
  appId: "1:29727312343:web:14e58637f47a0994fde392"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

/* ✅ High performance Firestore */
export const db = initializeFirestore(app, {});

/* 🔥 Enable local cache */
enableIndexedDbPersistence(db)
  .then(() => {
    console.log("🔥 Firestore persistence enabled");
  })
  .catch((err) => {
    console.log("Persistence failed:", err.code);
  });