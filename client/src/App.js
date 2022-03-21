import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { Provider } from "react-redux";
import store from "./store/store";

import Header from "./components/header/Header";
import Routes from "./components/routing/Routes";
import ModalDialog from "./components/commons/ModalDialog";
import LandingContainer from "./components/commons/LandingContainer";
import ModalContainer from "./components/commons/ModalContainer";

export default function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Router>
          <LandingContainer>
            <Header />
            <Routes />
          </LandingContainer>
        </Router>
        <ModalDialog />
        <ModalContainer />
      </ChakraProvider>
    </Provider>
  );
}
