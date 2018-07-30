import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
// import 'firebase/datastore';

const config={
    apiKey: "AIzaSyCKCnt1taFzyAU5uXYy3oUf-BwILhu0fZ0",
    authDomain: "omt-project-eb3b1.firebaseapp.com",
    databaseURL: "https://omt-project-eb3b1.firebaseio.com",
    projectId: "omt-project-eb3b1",
    storageBucket: "omt-project-eb3b1.appspot.com",
    messagingSenderId: "504106106904"
};
export default firebase.initializeApp(config);