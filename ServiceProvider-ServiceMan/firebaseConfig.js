// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBcq_YoMCniMsIZfORmXqIK_MBohqUfy7c",
    authDomain: "rn-expo-jobs-project.firebaseapp.com",
    databaseURL: "https://rn-expo-jobs-project-default-rtdb.firebaseio.com/",
    projectId: "rn-expo-jobs-project",
    storageBucket: "rn-expo-jobs-project.appspot.com",
    messagingSenderId: "527729606732",
    appId: "1:527729606732:web:619a352fc0a4f1800f34e9"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app)
console.log("Database initialized", { db })
export { db }
