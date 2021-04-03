import { useRef } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuth } from "../../providers/auth";

interface Props extends RouteProps {}

export const PrivateRoute: React.FC<Props> = ({
  path,
  component: C,
  ...rest
}) => {
  const { user } = useAuth();
  const userRef = useRef(user);

  if (!C) return null;

  const Component = C as React.ElementType;

  return (
    <Route
      path={path}
      render={(props) => {
        // if user is logged in render component
        // else redirect to /login

        return userRef.current ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
      {...rest}
    />
  );
};
