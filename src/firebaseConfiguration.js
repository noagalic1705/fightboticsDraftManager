// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyA_MMwzVuuavbWLzaeAKjfk9t8ckK_AaMU",

    authDomain: "fightbotics-draft-manager.firebaseapp.com",

    projectId: "fightbotics-draft-manager",

    storageBucket: "fightbotics-draft-manager.firebasestorage.app",

    messagingSenderId: "1090971810511",

    appId: "1:1090971810511:web:a9acc9914b82a6790c15ba"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);