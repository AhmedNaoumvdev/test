"use client";
import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
} from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";

export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

interface AuthContextType {
  user: User | undefined;
  googleWithPopUp: (auth: any, provider: any) => Promise<void>;
}

const AuthContext = createContext<Partial<AuthContextType>>({});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>();

  async function googleWithPopUp(auth: any, provider: any): Promise<void> {
    await signInWithPopup(auth, provider);
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      if (currentUser) setUser(currentUser);
    });
    return () => unSubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, googleWithPopUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const userAuth = () => {
  return useContext(AuthContext);
};
