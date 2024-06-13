// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  onSnapshot,
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
import axios from "axios";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
//create context
export const FirebaseContext = createContext();

//create provider
export default function FirebaseProvider({ children }) {
  const firebaseConfig = {
    apiKey: "AIzaSyCxilvEzhx5243-l1OwIezF--D1t2kU59Y",
    authDomain: "justawesome-4a997.firebaseapp.com",
    projectId: "justawesome-4a997",
    storageBucket: "justawesome-4a997.appspot.com",
    messagingSenderId: "1010464826067",
    appId: "1:1010464826067:web:e9449cc98667d16f672a26",
    measurementId: "G-HNZT7XH9JW"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);
  const storage = getStorage(app);
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [userAuth, setUserAuth] = useState(null);
  const [userDocRef, setUserDocRef] = useState(null);
  const {
    setError,
    activateToast,
    TOASTTYPES,
    generateUUID,
    EVENT_STATUS,
  } = useContext(UtilityContext);
  const userCollection = collection(db, "users");

  useEffect(() => {
    if (user === null) return;
    const docRef = doc(db, "users", user.email);
    setUserDocRef(docRef);
  }, [user]);

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
          .then((docSnap) => {
            const unSub = onSnapshot(doc(db, "users", email), (userDoc) => {
              console.log("user updated");
              setUser(userDoc.data());
            });
            return unSub;
          })
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

  const uploadImageToStorage = async (file, category) => {
    if (!file) return Promise.resolve("");
    const imageRef = ref(storage, `/${category}/images/${file.name}`);
    try {
      const snapshot = await uploadBytes(imageRef, file);
      const urlPromise = await getDownloadURL(imageRef);
      return Promise.resolve(urlPromise);
    } catch (error) {
      console.error(error);
      setError(error);
      return Promise.reject(error);
    }
  };

  const getRandomGameImageUrl = async () => {
    const num = Math.ceil(Math.random() * 9);
    const imageRef = ref(storage, `/events/images/games${num}.png`);
    const urlPromise = await getDownloadURL(imageRef);
    return Promise.resolve(urlPromise);
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
      const gameDocRef = doc(db, "games", gameData.id);
      if (games.includes(gameDocRef)) {
        activateToast(
          "That game is already in your collection",
          TOASTTYPES.WARNING,
          3000
        );
        return;
      }
      updateDoc(userDocRef, { games: arrayUnion(gameDocRef) }).then(() =>
        activateToast("game added to your collection", TOASTTYPES.SUCCESS, 3000)
      );
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  const checkDbForGame = (gameID) => {
    const gameDocRef = doc(db, "games", gameID);
    getDoc(gameDocRef)
      .then((gameDocSnap) => {
        if (gameDocSnap.exists()) {
          return true;
        }
        return false;
      })
      .catch((err) => {
        setError(err);
      });
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
    eventInfo.attendees.push({
      name: user.name,
      id: user.email,
      reference: userDocRef,
      status: "host"
    });
    setDoc(eventDocRef, { ...eventInfo, host: userDocRef, UUID: UUID })
      .then((event) => {
        console.log(event);
        activateToast("Event created", TOASTTYPES.SUCCESS, 3000);
        updateDoc(userDocRef, { events_hosting: arrayUnion(eventDocRef) });
      })
      .catch((err) => setError(err));
  };

  const getCurrentUserEvents = async () => {
    try {
      const hostingDocs = await Promise.all(
        user.events_hosting.map((eventRef) => getDoc(eventRef))
      );
      const attendingDocs = await Promise.all(
        user.events_attending.map((eventRef) => getDoc(eventRef))
      );
      const eventsList = [
        ...hostingDocs.map((event) => event.data()),
        ...attendingDocs.map((event) => event.data()),
      ];
      console.log(eventsList);
      return eventsList;
    } catch (err) {
      console.error(err);
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
        events_hosting: [],
        events_attending: [],
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
          duration: 1500,
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
      const event = docSnap.data();
      console.dir(user.id);
      const matches = event.attendees.filter(
        (attendee) => attendee.id == user.email
      );
      if (matches.length > 0 || event.host.id === user.email) {
        return event;
      } else {
        return null;
      }
    }
    else {
      setError("Event not found");
    }
  };

  const groupEventInvite = async (emailsString, eventId) => {
    const emailsArray = emailsString.split(",");
    const needToJoin = [];
    const attendeesArray = [];
    console.log(emailsArray)
    const eventDocRef = doc(db, "events", eventId);
    for (let email of emailsArray) {
      console.log(email)
      const userDocRef = doc(db, "users", email);
      const docSnap = await getDoc(userDocRef);
      console.log(docSnap.data())
      if (!docSnap.exists()) {
        needToJoin.push(email);
      } 
      else {
        const { displayName } = docSnap.data();
        await updateDoc(eventDocRef, {attendees: arrayUnion({
          id: email,
          name: displayName,
          reference: userDocRef,
          status: EVENT_STATUS.invited,
        })});
        await updateDoc(userDocRef, {
          events: arrayUnion({
            reference: eventDocRef,
            status: EVENT_STATUS.invited,
          }),
        });
      }
    }
    console.log(needToJoin)
  };
  const clientId = "usRohsToAJ";
  const baseUrl = "https://api.boardgameatlas.com/api/";

  const isCurrentUserHost = (eventId) => {
    // console.log(userDocRef)
    // console.log(eventDocRef)
    // return userDocRef == e
  };
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
    groupEventInvite,
    user,
    userDocRef,
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
    searchForGameByTitle,
    uploadImageToStorage,
    isCurrentUserHost,
    getRandomGameImageUrl,
  };
  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}
