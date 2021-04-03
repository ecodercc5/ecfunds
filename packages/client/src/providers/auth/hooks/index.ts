import { useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { GetMeQuery } from "../../../graphql/types";
import { GET_ME } from "../../../graphql/user";
import { useLazyMe } from "../../../hooks/auth";
import { FirebaseApp, FirebaseUser } from "../../../types/firebase";

export const useAuthState = (firebase: FirebaseApp) => {
  const authStateInitRef = useRef(false);
  const firebaseUserRef = useRef<FirebaseUser | null>(null);

  const [authMeta, setAuthMeta] = useState({ isLoading: true, error: "" });
  const [
    getMe,
    { data: lazyMeData, loading: isMeLoading, called },
  ] = useLazyMe();
  const { data } = useQuery<GetMeQuery>(GET_ME, { fetchPolicy: "cache-only" });

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      async (user) => {
        console.log("on auth state changed");

        // is first auth state initialization
        if (!authStateInitRef.current && user) {
          console.log("user already logged in");

          getMe();

          user.getIdToken().then((idToken) => console.log(idToken));
        }

        authStateInitRef.current = true;
        firebaseUserRef.current = user;

        setAuthMeta((prev) => ({ ...prev, isLoading: false }));
      },
      (err) => {
        setAuthMeta((prev) => ({ ...prev, error: err.message }));
      }
    );

    return unsubscribe;
  }, [firebase, getMe]);

  const isLoading =
    authMeta.isLoading ||
    isMeLoading ||
    (firebaseUserRef.current ? !called : false);
  const me = data?.me || lazyMeData?.me || null;

  return { isLoading, error: authMeta.error, user: me };
};
