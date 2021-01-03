import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAw_SbwNhqladza1HAjF8wUnJkvs_oovtg",
  authDomain: "appcours-2a094.firebaseapp.com",
  databaseURL: "https://appcours-2a094.firebaseio.com",
  projectId: "appcours-2a094",
  storageBucket: "appcours-2a094.appspot.com",
  messagingSenderId: "994721989670",
  appId: "1:994721989670:web:da8df58504787e965f92e7",
  measurementId: "G-Q2ZY2K0W89",
};
firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
export const storage = firebase.storage()
//Authentication
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

export const createUserProfileDocument = async (
  user: any,
  additionalData: any
) => {
  if (!user) return;
  // get a reference to the place in the database where a user profile might be
  const userRef = firestore.doc(`users/${user.uid}`);

  //Go and fetch the document from that location
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL, uid } = user;
    const Year = new Date().getFullYear();
    const Month = new Date().getMonth();
    const Day = new Date().getDate();
    const createdAt = `${Day}/${Month + 1}/${Year}`;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        uid,
        ...additionalData,
      });
    } catch (err) {
      console.error("Error Creating user", err.message);
    }
  }

  return getUserDocument(user.uid);
};
export const getUserDocument = async (uid: any) => {
  if (!uid) return null;
  try {
    return firestore.collection("users").doc(uid);
  } catch (err) {
    console.error("Error Fetching User", err.message);
  }
};
export default firebaseConfig;
