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
import axios from "axios"
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
  const [userDocRef, setUserDocRef] = useState(null);
  const { setError, activateToast, TOASTTYPES, generateUUID } = useContext(
    UtilityContext
  );
  const userCollection = collection(db, "users");
  
  useEffect(()=>{
    if (user === null) return;
    const docRef = doc(db, "users", user.email);
    setUserDocRef(docRef)
  }, [user])

  onAuthStateChanged(auth, (userData) => {
    //console.log(userData)
    if (userData && userData?.uid) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = userData.uid;
      const email = userData.email;
      if (userAuth === null) {
        setUserAuth(userData);
      }
      if (user === null) {
        getUser({ uid: uid, email: email })
          .then((docSnap) => setUser(docSnap.data()))
          .catch((err) => setError(err));
      }
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

  const addGameToDb = async (gameData) => {
    const {
      id,
      name,
      year_published,
      min_players,
      max_players,
      min_playtime,
      max_playtime,
      min_age,
      description_preview,
      thumb_url,
      image_url,
      primary_publisher,
      mechanics,
      categories,
    } = gameData;
    if (checkDbForGame(id)) {
      console.log("game was already in database");
      return id;
    }
    const gameDocRef = doc(db, "games", id);
    setDoc(gameDocRef, {
      id,
      name,
      year_published,
      min_players,
      max_players,
      min_playtime,
      max_playtime,
      min_age,
      description_preview,
      thumb_url,
      image_url,
      primary_publisher,
      mechanics,
      categories,
    })
      .then(() => {
        console.log(`added game with id ${id} to database`);
        return id;
      })
      .catch((err) => {
        console.error(err);
        return null;
      });
  };

  const addGameToCurrentUser = async (gameData) => {
    try {
      await addGameToDb(gameData);
      const docSnap = await getDoc(userDocRef);
      const games = docSnap.data().games;
      const gameDocRef = doc(db, "games", gameData.id)
      if (games.includes(gameDocRef)) {
        activateToast(
          "That game is already in your collection",
          TOASTTYPES.WARNING,
          3000
        );
        return;
      }
      updateDoc(userDocRef, { games: arrayUnion(gameDocRef) }).then(() =>
        activateToast(
          "game added to your collection",
          TOASTTYPES.SUCCESS,
          3000
        )
      );
    } catch (err) {
      setError(err);
    }
  };

  const checkDbForGame = (gameID) => {
      const gameDocRef= doc(db, "games", gameID);
      getDoc(gameDocRef).then((gameDocSnap)=>{;
      if (gameDocSnap.exists()) {
        return true;
      }
      return false
    }).catch((err) => {
      setError(err);
    })
  };
  // const checkDbForGame = async (gameID) => {
  //   const gameDocRef = doc(db, "games", gameID);
  //   try {
  //     const gameDocSnap = await getDoc(gameDocRef);
  //     if (gameDocSnap.exists()) {
  //       return true;
  //     }
  //     return false;
  //   } catch (e) {
  //     setError(e);
  //   }
  // };

  const createEvent = async (eventInfo) => {
    const UUID = generateUUID();
    const eventDocRef = doc(db, "events", UUID);
    setDoc(eventDocRef, { ...eventInfo, host: userDocRef, UUID: UUID })
      .then((event) => {
        console.log(event);
        activateToast("Event created", TOASTTYPES.SUCCESS, 3000);
        updateDoc(userDocRef, { events: arrayUnion(event) });
      })
      .catch((err) => setError(err));
  };

  const getCurrentUserEvents = async () => {
    try {
      const eventsDocs = await Promise.all(
        user.events.map((eventRef) => getDoc(eventRef))
      );
      const eventsList = eventsDocs.map((event) => event.data());
      console.log(eventsList);
      return eventsList;
    } catch (err) {
      setError(err);
    }
  };

  const getCurrentUserGames = async () => {
    const docRef = doc(db, "users", user.email);
    const docSnap = await getDoc(docRef);
    const games = docSnap.data().games;
    return games;
  };

  const getGamesByUid = async (uid) => {
    const collectionRef = collection(db, "users");
    const q = query(collectionRef, where("uid", "==", uid));
    try {
      const querySnapshot = await getDocs(q);
      const user = querySnapshot.docs[0].data();
      return user.games;
    } catch (err) {
      setError(err);
    }
  };
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
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap;
    setDoc(
      docRef,
      {
        uid: uid,
        email: email,
        displayName: "",
        photoURL: "",
        games: [],
        events: [],
      },
      { merge: true }
    )
      .then(() => {
        activateToast({
          headline: "Success",
          message: "Created new user",
          type: TOASTTYPES.SUCCESS,
          duration: 3000,
        });
        return getDoc(docRef);
      })
      .catch((err) => setError(err));
  };

  const signIn = (credentials) => {
    const { email, password } = credentials;
    signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        activateToast({
          headline: "Success",
          message: "Signed in",
          type: TOASTTYPES.SUCCESS,
          duration: 3000,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getEventById = async (id) => {
    const docRef = doc(db, "events", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  };
 const clientId = "usRohsToAJ";
  const baseUrl = "https://api.boardgameatlas.com/api/";

  const searchForGameByTitle = (title, scope, data) => {
    
    const URL = `${baseUrl}search?name=${title}&client_id=${clientId}`;
    console.log(URL);
    return axios
      .get(URL)
      .then((res) => res.data.games)
      .catch((err) => {
        setError(err);
        return null;
      });
  };
  const value = {
    user,
    userAuth,
    signUp,
    signIn,
    logOut,
    addGameToCurrentUser,
    createEvent,
    getCurrentUserEvents,
    getCurrentUserGames,
    getGamesByUid,
    getEventById,
    checkDbForGame,
    searchForGameByTitle
  };
  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}
