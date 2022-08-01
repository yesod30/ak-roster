import { getApps, initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyDjpt2G4GFQjYbPT5Mrj6L2meeWEnsCEgU",
  authDomain: "ak-roster.firebaseapp.com",
  projectId: "ak-roster",
  storageBucket: "ak-roster.appspot.com",
  messagingSenderId: "1076086810652",
  appId: "1:1076086810652:web:ed1da74b87a08bf4b657d9",
  measurementId: "G-VZXJ8MY6D1",
  databaseURL: "https://ak-roster-default-rtdb.firebaseio.com/",
};

const initFirebase = () => {
  if (!getApps().length) initializeApp(firebaseConfig);
}
export default initFirebase;