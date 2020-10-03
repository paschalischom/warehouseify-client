import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    // Firebase configuration
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
