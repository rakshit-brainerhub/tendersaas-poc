import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const authContext = createContext();
export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is not auth provider");
  return context;
};

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((creds) =>
        setDoc(doc(db, "users", creds.user.uid), { rol: "user" })
      )
      .then(() => navigate("/"))
      .catch((error) => alert(error.message));
  };

  const login = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password).then((creds) => {
      getDoc(doc(db, "users", creds.user.uid)).then((docSnap) => {
        if (docSnap.exists()) {
          switch (docSnap.data().rol) {
            case "admin":
              navigate("/AdminView");
              break;
            case "user":
              navigate("/");
              break;
          }
        }
      });
    })
    .catch((error) => toast.info(error.message));
  };

  const logOut = () => signOut(auth);

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (currenUser) => {
      setUser(currenUser);
      setLoading(false);
    });

    return () => unsuscribe();
  }, []);

  return (
    <authContext.Provider
      value={{
        signUp,
        login,
        user,
        logOut,
        loading,
        loginWithGoogle,
        resetPassword,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
