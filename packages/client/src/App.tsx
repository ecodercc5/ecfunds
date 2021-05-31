import { Switch } from "react-router";
import { Box } from "@chakra-ui/react";
import { PrivateRoute } from "./containers/routes/PrivateRoute";
import { PublicRoute } from "./containers/routes/PublicRoute";
import { Login } from "./pages/Login";
import { ProjectDetailsPage } from "./pages/ProjectDetailsPage";
import { HomePage } from "./pages/HomePage";
import { Logout } from "./pages/Logout";
import { CreateProjectPage } from "./pages/CreateProject";
import { BillingOnboardingPage } from "./pages/BillingOnboarding";
import { BackProjectPage } from "./pages/BackProject";
import { useEffect } from "react";

export const App = () => {
  useEffect(() => {
    setTimeout(() => {
      (
        document.querySelector(".firebase-emulator-warning") as HTMLElement
      ).remove();
    }, 0);
  }, []);

  return (
    <Box bg="#FEFEFE" height="100%">
      <Switch>
        <PrivateRoute exact path="/" component={HomePage} />
        <PublicRoute path="/login" component={Login} />
        <PrivateRoute path="/logout" component={Logout} />
        <PrivateRoute
          exact
          path="/projects/:id"
          component={ProjectDetailsPage}
        />
        <PrivateRoute
          path="/projects/:id/backing"
          component={BackProjectPage}
        />
        <PrivateRoute path="/create-project" component={CreateProjectPage} />
        <PrivateRoute
          path="/billing/onboarding"
          component={BillingOnboardingPage}
        />
      </Switch>
    </Box>
  );
};
