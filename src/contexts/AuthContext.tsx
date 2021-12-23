import React, { useContext, useState, useEffect, FC } from "react";
import firebase from "firebase/auth";
import { auth } from "../firebase";

interface AuthContextInterface {
  user: firebase.UserInfo | null;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<any>;
}

const defaultSate = {
  user: null,
  loginWithEmailAndPassword: async (email: string, password: string) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
    }
  },
};

const AuthContext = React.createContext<AuthContextInterface>(defaultSate);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<firebase.UserInfo | null>(null);

  //   function loginWithGoogle() {
  //     return auth.signInWithPopup(new auth.GoogleAuthProvider());
  //   }

  function loginWithEmailAndPassword(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  const value: AuthContextInterface = {
    user,
    loginWithEmailAndPassword,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
