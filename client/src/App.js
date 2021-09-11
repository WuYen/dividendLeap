import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { Provider } from "react-redux";
import store from "./store/store";

import Header from "./component/Header";
import Routing from "./component/Routing";

export default function App() {
  return (
    <Providers>
      <Header />
      <Routing />
    </Providers>
  );
}

function Providers(props) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Router>{props.children}</Router>
      </ChakraProvider>
    </Provider>
  );
}
