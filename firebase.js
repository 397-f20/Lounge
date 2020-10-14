import * as firebase from 'firebase';
import 'firebase/auth';
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyASZ_dPEaJz6zic_SnPBMHoFydp_PkPpa8",
    authDomain: "lounge-abdc4.firebaseapp.com",
    databaseURL: "https://lounge-abdc4.firebaseio.com",
    projectId: "lounge-abdc4",
    storageBucket: "lounge-abdc4.appspot.com",
    messagingSenderId: "1037521076753",
    appId: "1:1037521076753:web:7f88c6e37f973feae067b0",
    measurementId: "G-T252V65GKY"
  };

firebase.initializeApp(firebaseConfig);

export { firebase };