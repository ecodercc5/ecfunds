import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { firebase } from "./firebase";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./providers/auth";
import { ChakraProvider } from "@chakra-ui/react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { theme } from "./theme";

// TODO: Learn wth this means!!!
const httpLink = createHttpLink({
  uri: "http://localhost:8888/.netlify/functions/api/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token
  const token = (await firebase.auth().currentUser?.getIdToken()) || "";

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ChakraProvider theme={theme}>
          <AuthProvider firebase={firebase}>
            <App />
          </AuthProvider>
        </ChakraProvider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
