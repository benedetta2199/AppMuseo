import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD9z4bsUCahGzD7cQXdKkcT_UVlYI3oDcY",
    authDomain: "museo-717ca.firebaseapp.com",
    databaseURL: "https://museo-717ca-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "museo-717ca",
    storageBucket: "museo-717ca.appspot.com",
    messagingSenderId: "386115662153",
    appId: "1:386115662153:web:91bf67e9c291360384ea98"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;