import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import { getAuth }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCX4nJv28LRTtCcH3sjj-LUiXzYfxK3SDM",
  authDomain: "loan-management-system-a5bd8.firebaseapp.com",
  projectId: "loan-management-system-a5bd8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
