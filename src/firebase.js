import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB2VPRargMjLiSioJ5HcktddlJAIkRYMOA",
  authDomain: "preloved-kicks.firebaseapp.com",
  projectId: "preloved-kicks",
  storageBucket: "preloved-kicks.firebasestorage.app",
  messagingSenderId: "867892948191",
  appId: "1:867892948191:web:c8bc503ecb91d1d3f94d6a"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
