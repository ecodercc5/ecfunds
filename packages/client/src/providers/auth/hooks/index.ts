import { useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { GetMeQuery } from "../../../graphql/types";
import { GET_ME } from "../../../graphql/user";
import { FirebaseApp } from "../../../types/firebase";

export const useAuthState = (firebase: FirebaseApp) => {
  const authStateInitRef = useRef(false);

  const [init, setInit] = useState(false);
  const [authMeta, setAuthMeta] = useState({ isLoading: true, error: "" });
  const { data, refetch: getUser } = useQuery<GetMeQuery>(GET_ME, {
    skip: !init,
  });

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      async (user) => {
        console.log("on auth state changed");

        // is first auth state initialization
        if (!authStateInitRef.current && user) {
          console.log("user already logged in");

          await getUser().then((res) => {
            console.log("done getting user");

            console.log({ me: res.data.me });
          });

          user.getIdToken().then((idToken) => console.log(idToken));
        }

        authStateInitRef.current = true;

        setInit(true);

        setAuthMeta((prev) => ({ ...prev, isLoading: false }));
      },
      (err) => {
        setAuthMeta((prev) => ({ ...prev, error: err.message }));
      }
    );

    return unsubscribe;
  }, [firebase, getUser]);

  const res = {
    isLoading: authMeta.isLoading,
    error: authMeta.error,
    user: data?.me || null,
  };

  console.log(res);

  return res;
};
