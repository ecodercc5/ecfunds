import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import { AuthProvider } from "./providers/auth";
import { firebase } from "./firebase";
import { ChakraProvider } from "@chakra-ui/react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

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
