import * as firebase from "firebase/app";
import "firebase/auth";
/**
 * Dio sa podacima potrebnim za pristup bazi
 * */

const app = firebase.initializeApp({
    apiKey: "AIzaSyCgFttBK492w8Dh_KvvIZVtgHA21HDgfb4",
    authDomain: "todo-877c5.firebaseapp.com",
    projectId: "todo-877c5",
    storageBucket: "todo-877c5.appspot.com",
    messagingSenderId: "37364015566",
    appId: "1:37364015566:web:3c48ac4428af1d8a14cb9f"
});

export default app;