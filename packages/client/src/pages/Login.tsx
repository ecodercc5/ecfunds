import { Button } from "@chakra-ui/button";
import { useSignInWithGoogle } from "../hooks/auth";

export const Login: React.FC = () => {
  const { execute: signInWithGoogle } = useSignInWithGoogle();

  return (
    <div>
      <Button
        onClick={() => {
          signInWithGoogle();
        }}
      >
        Sign in with Google
      </Button>
    </div>
  );
};
