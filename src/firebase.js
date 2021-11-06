import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCPElPjGEIsd_jg5nbQ6Oj04aobwbygoSo",
    authDomain: "training-control-111fd.firebaseapp.com",
    projectId: "training-control-111fd",
    storageBucket: "training-control-111fd.appspot.com",
    messagingSenderId: "162250357018",
    appId: "1:162250357018:web:7a34039ab7d8a9e29a94a3",
    measurementId: "G-ZBSR8YGXQK"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();

export { db };