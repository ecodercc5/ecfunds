import { useRef } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuth } from "../../providers/auth";

interface Props extends RouteProps {}

export const PublicRoute: React.FC<Props> = ({
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
        // if user is not logged in display component
        // else redirect to main app route

        return !userRef.current ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        );
      }}
      {...rest}
    />
  );
};
