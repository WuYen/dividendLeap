import React from "react";
import { Route, Switch } from "react-router-dom";
import ErrorBoundary from "../ErrorBoundary";
import PrivateRoute from "./PrivateRoute";
import {
  Login,
  Registration,
  ResetPassword,
  DividendSchedule,
  DividendDetail,
  DividendMaintain,
  News,
  MyStock,
  ToolPage,
} from "../../pages/index";

export default function Routing(props) {
  return (
    <ErrorBoundary>
      <Switch>
        <PrivateRoute path="/my/stock">
          <MyStock />
        </PrivateRoute>
        <PrivateRoute path="/tool">
          <ToolPage />
        </PrivateRoute>

        <Route path="/detail/:stockNo/:name?">
          <DividendDetail />
        </Route>
        <Route path="/schedule/maintain">
          <DividendMaintain />
        </Route>
        <Route path="/registration">
          <Registration />
        </Route>
        <Route path="/resetpassword">
          <ResetPassword />
        </Route>
        <Route path="/news">
          <News />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/" exact>
          <DividendSchedule />
        </Route>
      </Switch>
    </ErrorBoundary>
  );
}
