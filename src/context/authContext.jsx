import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is not auth provider");
  return context;
};

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // signup logic
  const signUp = (email, password, role) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((creds) => setDoc(doc(db, "users", creds.user.uid), { rol: role }))
      .then(() => { 
        setUserRole(role)
        navigate("/")
      })
      .catch((error) => alert(error.message));
  };

  // login logic
  const login = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((creds) => {
        getDoc(doc(db, "users", creds.user.uid)).then((docSnap) => {
          if (docSnap.exists()) {
            setUserRole(docSnap.data().rol)
            switch (docSnap.data().rol) {
              case "admin":
                navigate("/AdminView");
                break;
              case "contractor":
                navigate("/");
                break;
              case "broker":
                navigate("/");
                break;
              case "agent":
                navigate("/");
                break;
              case "investor":
                navigate("/");
                break;
              case "client":
                navigate("/");
                break;
              case "user":
                navigate("/");
                break;
            }
          }
        });
      })
      .catch((error) => alert(error.message));
  };

  // logOut logic
  const logOut = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const docSnap = await getDoc(doc(db, "users", currentUser.uid));
          if (docSnap.exists()) {
            setUserRole(docSnap.data().rol);
          } else {
            console.log("No role found for user");
            setUserRole(null);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, []);

  return (
    <authContext.Provider
      value={{
        signUp,
        login,
        user,
        userRole,
        logOut,
        loading,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
