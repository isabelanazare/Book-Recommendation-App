var firebase = require('firebase/app');
require('firebase/firestore');

var firebaseConfig = require('./FirebaseConfig');

firebase.initializeApp(firebaseConfig);

module.exports = firebase.firestore();