import React from "react";
import { FirebaseApp, FirebaseUser } from "../../types/firebase";
import { useAuthState } from "./hooks";

interface IAuthContext {
  isLoading: boolean;
  error: string;
  user: any;
}

const AuthContext = React.createContext<IAuthContext>(null!);

interface Props {
  firebase: FirebaseApp;
}

export const AuthProvider: React.FC<Props> = ({ firebase, children }) => {
  const authState = useAuthState(firebase);

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
