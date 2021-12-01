import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { Provider } from "react-redux";
import store from "./store/store";

import Header from "./components/Header/Header";
import Routes from "./components/Routing/Routes";
import ModalDialog from "./components/General/ModalDialog";
import LandingContainer from "./components/LandingContainer";

export default function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Router>
          <LandingContainer />
          <Header />
          <Routes />
        </Router>
        <ModalDialog />
      </ChakraProvider>
    </Provider>
  );
}
