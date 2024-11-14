import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { db } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    user: null,
    userData: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeSnap;
    // whenever the auth state changes/ so if they login/ logout
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userData = await getDoc(userRef);

        // set the user state to their data, or to null if nothings there
        setCurrentUser({
          user: user,
          userData: userData.exists() ? userData.data() : null, // Check if data exists
        });

        // unmount the on snapshot listener so theres not more then one
        if (unsubscribeSnap) {
          unsubscribeSnap();
        }

        // whenever the users document in dabase changes, change the user data
        unsubscribeSnap = onSnapshot(doc(db, "users", user.uid), (doc) => {
          setCurrentUser({
            user: user,
            userData: doc.exists() ? doc.data() : null, // Check if data exists
          });
        });
      } else {
        // No user is logged in, so reset currentUser
        setCurrentUser({ user: null, userData: null });
      }

      setLoading(false);
    });

    return () => {
      if (unsubscribeAuth) unsubscribeAuth();
      if (unsubscribeSnap) unsubscribeSnap();
    }; // Cleanup listeners when component unmounts
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
