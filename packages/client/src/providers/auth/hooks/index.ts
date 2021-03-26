import { useEffect, useRef, useState } from "react";
import { useLazyMe } from "../../../hooks/auth";
import { FirebaseApp } from "../../../types/firebase";

export const useAuthState = (firebase: FirebaseApp) => {
  const authStateInitRef = useRef(false);

  const [authMeta, setAuthMeta] = useState({ isLoading: true, error: "" });
  const [getMe, { data = { me: null }, loading: isMeLoading }] = useLazyMe();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      async (user) => {
        console.log("on auth state changed");

        // is first auth state initialization
        if (!authStateInitRef.current && user) {
          getMe();

          user.getIdToken().then((idToken) => console.log(idToken));
        }

        authStateInitRef.current = true;

        setAuthMeta((prev) => ({ ...prev, isLoading: false }));
      },
      (err) => {
        setAuthMeta((prev) => ({ ...prev, error: err.message }));
      }
    );

    return unsubscribe;
  }, [firebase, getMe]);

  const isLoading = authMeta.isLoading || isMeLoading;

  return { isLoading, error: authMeta.error, user: data.me };
};
