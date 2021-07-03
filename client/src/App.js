import React, { useEffect, useReducer } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import jwt_decode from "jwt-decode";

import Context from "./store/context";
import * as Reducer from "./store/reducers/reducer";

import Header from "./component/Header";
import ErrorBoundary from "./component/Common/ErrorBoundary";
import { DividendSchedule, DividendDetail } from "./component/Dividend";
import MaintainSchedule from "./component/MaintainSchedule/Container";
import Login from "./component/Login";
import MyStock from "./component/MyStock";

function App() {
  const [reducer, dispatch] = useReducer(
    Reducer.ScheduleReducer,
    Reducer.initialState
  );

  useEffect(() => {
    initialApp();
  }, []);

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

function initialApp() {
  const jwt = localStorage.getItem("AUTH_TOKEN");
  if (jwt) {
    var decoded = jwt_decode(jwt);
    window.JWT = { context: decoded, token: jwt };
  } else {
    window.JWT = null;
  }
}

function Content(props) {
  return (
    <Switch>
      <Route path="/detail/:stockNo/:name?">
        <DividendDetail />
      </Route>
      <Route path="/schedule/maintain">
        <MaintainSchedule />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <PrivateRoute path="/my/stock">
        <MyStock />
      </PrivateRoute>
      <Route path="/">
        <DividendSchedule />
      </Route>
    </Switch>
  );
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        return window.JWT ? children : <Redirect to="/login" />;
      }}
    />
  );
}

export default App;
