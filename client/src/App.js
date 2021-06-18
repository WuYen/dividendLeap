import React, { useReducer } from "react";
import DividendSchedule from "./component/DividendSchedule";
import DividendDetail from "./component/DividendDetail";
import Header from "./component/Header";
import ErrorBoundary from "./component/ErrorBoundary";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";

import Context from "./store/context";
import * as Reducer from "./store/reducers/reducer";

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
          <Switch>
            <Route path="/detail/:stockNo/:name?">
              <ErrorBoundary>
                <DividendDetail />
              </ErrorBoundary>
            </Route>
            <Route path="/">
              <ErrorBoundary>
                <DividendSchedule />
              </ErrorBoundary>
            </Route>
          </Switch>
        </Router>
      </ChakraProvider>
    </Context.Provider>
  );
}

export default App;
