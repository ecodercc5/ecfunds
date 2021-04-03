import { Route, Switch } from "react-router";
import { Box } from "@chakra-ui/react";
import { Components } from "./pages/Components";
import { PrivateRoute } from "./containers/routes/PrivateRoute";
import { PublicRoute } from "./containers/routes/PublicRoute";
import { Login } from "./pages/Login";

export const App = () => {
  return (
    <Box bg="#F7F7F7" height="100%">
      <Switch>
        <Route path="/components" component={Components} />
        <PrivateRoute
          path="/private"
          component={() => <div>Private route</div>}
        />
        <PublicRoute path="/login" component={Login} />
      </Switch>
    </Box>
  );
};
