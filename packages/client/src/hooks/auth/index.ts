import { useCallback } from "react";
import { firebase } from "../../firebase";
import { useLazyAsync } from "../useAsync";

export const useSignInWithGoogle = () => {
  const { isLoading, data, execute, error } = useLazyAsync(() => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const signIn = firebase.auth().signInWithPopup(googleProvider);

    return signIn;
  });

  return { isLoading, data, error, signInWithGoogle: execute };
};

export const useLogout = () => {
  const logout = useCallback(() => firebase.auth().signOut(), []);
  const { isLoading, data, execute, error } = useLazyAsync(logout);

  return { isLoading, data, error, logout: execute };
};
