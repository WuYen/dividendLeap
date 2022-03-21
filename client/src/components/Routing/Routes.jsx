import React from "react";
import { Route, Switch } from "react-router-dom";
import ErrorBoundary from "../commons/ErrorBoundary";
import PrivateRoute from "./PrivateRoute";
import {
  DividendDetailContainer,
  UserContainer,
  ScheduleContainer,
  MyStockContainer,
  NewsContainer,
  ToolContainer,
} from "../container";

export default function Routing(props) {
  return (
    <ErrorBoundary>
      <Switch>
        <Route path="/detail/:stockNo/:name?">
          <DividendDetailContainer />
        </Route>
        <Route path="/news">
          <NewsContainer />
        </Route>
        <Route path="/user/:pageType">
          <UserContainer />
        </Route>
        <Route path={["/", "/schedule"]} exact>
          <ScheduleContainer />
        </Route>

        <PrivateRoute path="/my/stock/:stockNo?">
          <MyStockContainer />
        </PrivateRoute>
        <PrivateRoute path="/tool">
          <ToolContainer />
        </PrivateRoute>
      </Switch>
    </ErrorBoundary>
  );
}
