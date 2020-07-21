import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {

    apiKey: 'AIzaSyDRPixXjtQ612sko4thFtoZ7LEpd5trgH4',
    authDomain: 'crwn-db-cc01e.firebaseapp.com',
    databaseURL: 'https://crwn-db-cc01e.firebaseio.com',
    projectId: 'crwn-db-cc01e',
    storageBucket: 'crwn-db-cc01e.appspot.com',
    messagingSenderId: '603306271040',
    appId: '1:603306271040:web:7750f04e13357f04f09aa5',
    measurementId: 'G-DE866KZG3Q'
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
if(!userAuth) return;

const userRef = firestore.doc(`users/${userAuth.uid}`);

const snapshot = await userRef.get();
if(!snapshot.exists){
const { displayName, email} = userAuth;
const createdAt = new Date();

try {
    await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
    })
}catch (error) {
    console.log('error creatig user', error.message);
}
}
return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;


