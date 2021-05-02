const firebase = require("firebase/app");
require("firebase/storage");

const firebaseConfig = {
    apiKey: "AIzaSyB4xJvFrULTaIjxk6dRCGsSawD5sfhbry8",
    authDomain: "election-6b934.firebaseapp.com",
    projectId: "election-6b934",
    storageBucket: "election-6b934.appspot.com",
    messagingSenderId: "288032932939",
    appId: "1:288032932939:web:ace87d7593dabe3a5bf9ce"
  };


firebase.initializeApp(firebaseConfig);

var storage = firebase.storage();

module.exports =  {storage, firebase}