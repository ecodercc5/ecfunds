import { useApolloClient, useLazyQuery, useMutation } from "@apollo/client";
import { useCallback } from "react";
import { firebase } from "../../firebase";
import { GetMeQuery, SignInUserMutation } from "../../graphql/types";
import { GET_ME, SIGN_IN_USER } from "../../graphql/user";
import { useLazyAsync } from "../useAsync";

export const useLazyMe = () => {
  return useLazyQuery<GetMeQuery>(GET_ME);
};

export const useSignInWithGoogle = () => {
  const client = useApolloClient();
  const [signInUser] = useMutation<SignInUserMutation>(SIGN_IN_USER, {
    update: (_, { data }) => {
      console.log("sign in update");

      console.log(data?.signInUser);

      // update me in the cache
      client.writeQuery({
        query: GET_ME,
        data: {
          me: data?.signInUser!,
        },
      });
    },
  });

  return useLazyAsync(async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(googleProvider);

    await signInUser();
  });
};

export const useLogout = () => {
  const client = useApolloClient();

  const logout = useCallback(() => firebase.auth().signOut(), []);
  return useLazyAsync(() => {
    return logout().then(() => client.resetStore());
  });
};
