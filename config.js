  const firebaseConfig = {
  apiKey: "AIzaSyBe4IoadazB72olqG8QZbD5FPKDCuQ8ZRU",
  authDomain: "bruxos-av.firebaseapp.com",
  databaseURL: "https://bruxos-av-default-rtdb.firebaseio.com",
  projectId: "bruxos-av",
  storageBucket: "bruxos-av.firebasestorage.app",
  messagingSenderId: "8805697243",
  appId: "1:8805697243:web:8f5970af5142bc244baefe"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();
//matrix
