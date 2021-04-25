import { Button } from "@chakra-ui/button";
import { useHistory } from "react-router";
import { useSignInWithGoogle } from "../hooks/auth";

export const Login: React.FC = () => {
  const history = useHistory();
  const { execute: signInWithGoogle } = useSignInWithGoogle();

  return (
    <div>
      <Button
        onClick={() => {
          signInWithGoogle().then(() => history.push("/logout"));
        }}
      >
        Sign in with Google
      </Button>
    </div>
  );
};
