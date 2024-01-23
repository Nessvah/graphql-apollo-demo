import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import router from "./Routes";
import { RouterProvider } from "react-router-dom";

//* 2 - imports from apollo client
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

//* if adding the token to the header request, we can add an auth header to every HTTP request,
//* by chaining together Apollo Links
const authLink = setContext((_, { headers }) => {
  //localStorage.removeItem("token");
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    },
  };
});

//* 3 - Next we need to initialize the apollo client passing through its
// constructor, the configuration that we need

const httpLink = createHttpLink({
  uri: "http://13.53.175.139:5001/", // endpoint for the graphql server
});

const createApolloClient = new ApolloClient({
  cache: new InMemoryCache(), // instance where apolo client uses to cache query results after fetching them
  link: authLink.concat(httpLink), // this will concatenate the auth link 
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* //* 4 - Connect the client with React with the Apollo Provider component. */}

    <ApolloProvider client={createApolloClient}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
