import { Button } from "@chakra-ui/button";
import { useHistory } from "react-router";
import { Layout } from "../components/layout/Layout";
import { useLogout } from "../hooks/auth";

interface Props {}

export const Logout = (props: Props) => {
  const history = useHistory();
  const { execute: logout } = useLogout();

  return (
    <Layout>
      <Button
        onClick={() => {
          console.log("logging out");

          logout().then(() => history.push("/login"));
        }}
      >
        Logout
      </Button>
    </Layout>
  );
};
