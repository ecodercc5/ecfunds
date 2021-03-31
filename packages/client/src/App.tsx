import { Route, Switch } from "react-router";
import { Box } from "@chakra-ui/react";
import { Components } from "./pages/Components";

export const App = () => {
  return (
    <Box bg="#F7F7F7" height="100%">
      <Switch>
        <Route path="/components" component={Components} />
      </Switch>
    </Box>
  );
};
