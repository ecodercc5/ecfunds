import React from "react";
import { User } from "../../graphql/types";
import { FirebaseApp } from "../../types/firebase";
import { useAuthState } from "./hooks";

interface IAuthContext {
  isLoading: boolean;
  error: string;
  user: User | null;
}

const AuthContext = React.createContext<IAuthContext>(null!);

interface Props {
  firebase: FirebaseApp;
}

export const AuthProvider: React.FC<Props> = ({ firebase, children }) => {
  const authState = useAuthState(firebase);

  return (
    <AuthContext.Provider value={authState}>
      {authState.isLoading ? <div>loading!!!</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
