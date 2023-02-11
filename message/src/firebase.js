import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyA9pQTLwPqsVZ4u4q0BCECpMKTc0AGE8uY",
    authDomain: "mess-f2401.firebaseapp.com",
    projectId: "mess-f2401",
    storageBucket: "mess-f2401.appspot.com",
    messagingSenderId: "479531870857",
    appId: "1:479531870857:web:d83f947aa8029876f1b458"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore();
