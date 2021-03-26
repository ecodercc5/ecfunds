import { useLazyQuery, useMutation } from "@apollo/client";
import { useCallback } from "react";
import { firebase } from "../../firebase";
import { GET_ME, SIGN_IN_USER } from "../../graphql/user";
import { useLazyAsync } from "../useAsync";

export const useLazyMe = () => {
  return useLazyQuery(GET_ME);
};

export const useSignInWithGoogle = () => {
  const [signInUser, { data: user, loading }] = useMutation(SIGN_IN_USER);

  const { isLoading, data, execute, error } = useLazyAsync(async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const userCredentials = await firebase
      .auth()
      .signInWithPopup(googleProvider);

    const uid = userCredentials.user?.uid;

    signInUser({
      variables: {
        uid,
      },
    }).then((res) => console.log(res));
  });

  return { isLoading, data, error, signInWithGoogle: execute };
};

export const useLogout = () => {
  const logout = useCallback(() => firebase.auth().signOut(), []);
  const { isLoading, data, execute, error } = useLazyAsync(logout);

  return { isLoading, data, error, logout: execute };
};
