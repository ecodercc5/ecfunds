import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import { AuthProvider } from "./providers/auth";
import { firebase } from "./firebase";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider firebase={firebase}>
        <App />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
