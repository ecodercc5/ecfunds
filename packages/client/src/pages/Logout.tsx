import { useHistory } from "react-router";
import { useLogout } from "../hooks/auth";

interface Props {}

export const Logout = (props: Props) => {
  const history = useHistory();
  const { execute: logout } = useLogout();

  return (
    <div>
      <button
        onClick={() => {
          console.log("loggin out");

          logout().then(() => history.push("/login"));
        }}
      >
        logout
      </button>
    </div>
  );
};
