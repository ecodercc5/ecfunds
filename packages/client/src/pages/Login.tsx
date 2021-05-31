import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { useHistory } from "react-router";
import { Layout } from "../components/layout/Layout";
import { useSignInWithGoogle } from "../hooks/auth";

export const Login: React.FC = () => {
  const history = useHistory();
  const { execute: signInWithGoogle } = useSignInWithGoogle();

  return (
    <Layout>
      <Flex justifyContent="center" alignItems="center" flex={2}>
        <Button
          onClick={() => {
            signInWithGoogle().then(() => history.push("/"));
          }}
        >
          Sign in with Google
        </Button>
      </Flex>
    </Layout>
  );
};
