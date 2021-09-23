import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { Provider } from "react-redux";
import store from "./store/store";

import Header from "./components/Header";
import Routes from "./components/Routing/Routes";

export default function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Router>
          <Header />
          <Routes />
        </Router>
      </ChakraProvider>
    </Provider>
  );
}
