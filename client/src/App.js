import React, { useReducer } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import Context from "./store/context";
import * as Reducer from "./store/reducers/reducer";

import Header from "./component/Header";
import Routing from "./component/Routing";

function App() {
  const [reducer, dispatch] = useReducer(
    Reducer.ScheduleReducer,
    Reducer.initialState
  );

  return (
    <Context.Provider value={{ ...reducer, dispatch }}>
      <ChakraProvider>
        <Router>
          <Header />
          <Routing />
        </Router>
      </ChakraProvider>
    </Context.Provider>
  );
}

export default App;
