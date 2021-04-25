import { Route, Switch } from "react-router";
import { Box } from "@chakra-ui/react";
import { PrivateRoute } from "./containers/routes/PrivateRoute";
import { PublicRoute } from "./containers/routes/PublicRoute";
import { Components } from "./pages/Components";
import { Login } from "./pages/Login";
import { ProjectDetailsPage } from "./pages/ProjectDetailsPage";
import { HomePage } from "./pages/HomePage";
import { Logout } from "./pages/Logout";

export const App = () => {
  return (
    <Box bg="#FEFEFE" height="100%">
      <Switch>
        <Route path="/components" component={Components} />
        <PrivateRoute
          path="/private"
          component={() => <div>Private route</div>}
        />
        <PublicRoute path="/login" component={Login} />
        <PrivateRoute path="/logout" component={Logout} />
        <Route path="/project/:id" component={ProjectDetailsPage} />
        <Route path="/projects" component={HomePage} />
      </Switch>
    </Box>
  );
};
