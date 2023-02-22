import firebase from 'firebase/app'
// the below imports are option - comment out what you don't need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/analytics'
import 'firebase/performance'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAN2riBVak3Cx7vs5M-l1RkpZb1Y2dNmYY",
    authDomain: "photoportfolio-d230b.firebaseapp.com",
    projectId: "photoportfolio-d230b",
    storageBucket: "photoportfolio-d230b.appspot.com",
    messagingSenderId: "79703137979",
    appId: "1:79703137979:web:80e45e6f24276b4b6c539e",
    measurementId: "G-Q42X59X1R1"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default function InitFirebase() {
    // if (!firebase.apps.length) {
    const app = initializeApp(firebaseConfig)
    const storage = getStorage(app);
    console.log('firebase init')
    // if (typeof window !== undefined) {
    //     if ('measurementId' in firebaseConfig) {
    //         firebase.analytics()
    //         firebase.performance()
    //     }
    // }
    // }
    return storage
}