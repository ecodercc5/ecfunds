import { Button } from "@chakra-ui/react";
import { useLogout, useSignInWithGoogle } from "./hooks/auth";
import { useAuth } from "./providers/auth";

export const App = () => {
  const auth = useAuth();
  const { signInWithGoogle } = useSignInWithGoogle();
  const { logout } = useLogout();

  console.log(auth);

  return (
    <div>
      {auth.isLoading ? (
        <div>loading</div>
      ) : (
        <pre>{JSON.stringify(auth.user, null, 4)}</pre>
      )}

      <Button onClick={signInWithGoogle}>Login With Google</Button>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};
