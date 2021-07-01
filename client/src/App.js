import React, { useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import Context from "./store/context";
import * as Reducer from "./store/reducers/reducer";

import Header from "./component/Header";
import ErrorBoundary from "./component/Common/ErrorBoundary";
import { DividendSchedule, DividendDetail } from "./component/Dividend";
import MaintainSchedule from "./component/MaintainSchedule/Container";
import Login from "./component/Login";

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
          <Content />
        </Router>
      </ChakraProvider>
    </Context.Provider>
  );
}

function Content(props) {
  return (
    <Switch>
      <Route path="/detail/:stockNo/:name?">
        <ErrorBoundary>
          <DividendDetail />
        </ErrorBoundary>
      </Route>
      <Route path="/schedule/maintain">
        <ErrorBoundary>
          <MaintainSchedule />
        </ErrorBoundary>
      </Route>
      <Route path="/login">
        <ErrorBoundary>
          <Login />
        </ErrorBoundary>
      </Route>
      <Route path="/">
        <ErrorBoundary>
          <DividendSchedule />
        </ErrorBoundary>
      </Route>
    </Switch>
  );
}

export default App;
