import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import { AuthProvider } from "./providers/auth";
import { firebase } from "./firebase";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8888/.netlify/functions/api/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider>
        <AuthProvider firebase={firebase}>
          <App />
        </AuthProvider>
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
