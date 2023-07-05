// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  where,
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  doc,
  query,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useState, useEffect, useContext, createContext } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { UtilityContext } from "./UtilityContext";
//create context
export const FirebaseContext = createContext();

//create provider
export default function FirebaseProvider({ children }) {
  const firebaseConfig = {
    apiKey: "AIzaSyConL1X3Yrjk4yQjAcx5x63sLmb3D5ay9Y",
    authDomain: "just-awesome-game-nights.firebaseapp.com",
    projectId: "just-awesome-game-nights",
    storageBucket: "just-awesome-game-nights.appspot.com",
    messagingSenderId: "838131575159",
    appId: "1:838131575159:web:b13cb3679befb92ca49972",
    measurementId: "G-LWS93CTE34",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [userAuth, setUserAuth] = useState(null);
  const {setError, activateToast, TOASTTYPES} = useContext(UtilityContext)
  const userCollection = collection(db, "users");
  
  onAuthStateChanged(auth, (userData) => {
    //console.log(userData)
    if (userData && userData?.uid) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = userData.uid;
      const email = userData.email;
      if (userAuth === null) {setUserAuth(userData)};
      if (user === null) {
        getUser({ uid: uid, email: email })
          .then(docSnap=>setUser(docSnap.data()))
          .catch((err) => setError(err));
        };
      // ...
    } else {
      setUserAuth(null);
      setUser(null);
    }
  });
  const logOut = () => {
    signOut(auth);
  };
  const validate = (credentials) => {
    const { email, password, password2 } = credentials;
    if (
      email === undefined ||
      password === undefined ||
      password2 === undefined
    ) {
      return false;
    }
    if (password !== password2) {
      return false;
    }
    return true;
  };

  const signUp = (credentials) => {
    const { email, password, password2 } = credentials;
    if (!validate(email, password, password2)) {
      console.error(new Error("Invalid email or password"));
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((data) => {
        console.log(data.user);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const addGameToCurrentUser = async (game, user) => {
    const { email } = user;
    const docRef = doc(db, "users", email);
    try {
    const docSnap = await getDoc(docRef);
    const games = docSnap.data().games;
    if (games.includes(game)) {
      activateToast(game + " is already in your collection", TOASTTYPES.WARNING, 3000)
      return;
    }
    updateDoc(docRef, {games: arrayUnion(game)}).then(()=>activateToast(game + " added to your collection", TOASTTYPES.SUCCESS, 3000))
  } catch (err) {
    setError(err)
  }
  }

  const createEvent = async (eventInfo) => {
    console.log(eventInfo)
    const { email } = user;
    const docRef = doc(db, "users", email);    
    addDoc(collection(db, "events"), {...eventInfo, host: docRef}).then((event)=>{
      activateToast("Event created", TOASTTYPES.SUCCESS, 3000)
      updateDoc(docRef, {events: arrayUnion(event)}) 
    }).catch((err)=>setError(err))
    
  }

  const getCurrentUserEvents = async () => {
    try {
    const eventsDocs = await Promise.all(user.events.map(eventRef => getDoc(eventRef)))
    const eventsList = eventsDocs.map(event => event.data())
    console.log(eventsList)
    return eventsList;
    } catch (err) {
      setError(err)
    }
  }

  const getCurrentUserGames = async () => {
    const docRef = doc(db, "users", user.email);
    const docSnap = await getDoc(docRef);
    const games = docSnap.data().games;
    return games;
  }

  const getGamesByUid = async (uid) => {
    const collectionRef = collection(db, "users");
    const q = query(collectionRef, where("uid", "==", uid));
    try {
      const querySnapshot = await getDocs(q);
      const user = querySnapshot.docs[0].data();
      return user.games;
    }
    catch (err) {
      setError(err)
    }
  }
  // const getUser = async (userData) => {
  //   const { uid, email } = userData;
  //   const docRef = doc(db, "users", email);
  //   if (user === null){
  //   setDoc(
  //     docRef,
  //     {
  //       uid: uid,
  //       email: email,
  //       displayName: "",
  //       photoURL: "",
  //       games: [],
  //       events: [],
  //     },
  //     { merge: true }
  //   )
  //     .then(() => getDoc(docRef))
  //     .then((docSnap) => setUser(docSnap.data()))
  //     .catch((err) => {
  //       console.log(err.message)
  //       setError(err) 
  //     });
  //   }
  // }
  const getUser = async (userData) => {
    const { uid, email } = userData;
    const docRef = doc(db, "users", email);
    if (user !== null) return user;
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) return docSnap
    setDoc(docRef, {
        uid: uid,
        email: email,
        displayName: "",
        photoURL: "",
        games: [],
        events: []
      },
      { merge: true }
    ).then(()=>{
      activateToast({headline: "Success", message: "Created new user", type: TOASTTYPES.SUCCESS, duration: 3000});
      return getDoc(docRef)
    }).catch((err)=>setError(err))
    }

    const signIn = (credentials) => {
    const { email, password } = credentials;
    signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        activateToast({headline: "Success", message: "Signed in", type: TOASTTYPES.SUCCESS, duration: 3000});
      })
      .catch((err) => {
        console.log(err);
      });
  };



  
  const value = { user, userAuth, signUp, signIn, logOut, addGameToCurrentUser, createEvent, getCurrentUserEvents, getCurrentUserGames, getGamesByUid};
  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}
