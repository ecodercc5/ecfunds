import { useEffect, useState } from "react";
import { FirebaseApp, FirebaseUser } from "../../../types/firebase";

export const useAuthState = (firebase: FirebaseApp) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      (user) => {
        console.log("on auth state changed");
        console.log(user);

        setUser(user);
        setIsLoading(false);
      },
      (err) => {
        setError(err.message);
        setIsLoading(false);
      }
    );

    return unsubscribe;
  }, [firebase]);

  return { isLoading, error, user };
};
