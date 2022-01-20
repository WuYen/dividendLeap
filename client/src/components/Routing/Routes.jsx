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
  Validation,
  Settings,
} from "../../pages/index";
import StockSocket from "../StockSocket";

export default function Routing(props) {
  return (
    <ErrorBoundary>
      <Switch>
        <Route path="/detail/:stockNo/:name?">
          <DividendDetail />
        </Route>
        <Route path="/schedule/maintain">
          <DividendMaintain />
        </Route>
        <Route path="/news">
          <News />
        </Route>
        <Route path="/user/registration">
          <Registration />
        </Route>
        <Route path="/user/login">
          <Login />
        </Route>
        <Route path="/user/validation">
          <Validation />
        </Route>
        <Route path="/user/settings">
          <Settings />
        </Route>
        <Route path="/user/resetpassword">
          <ResetPassword />
        </Route>
        <Route path={["/", "/schedule"]} exact>
          <DividendSchedule />
        </Route>

        <PrivateRoute path="/my/stock/:stockNo?">
          <MyStock />
        </PrivateRoute>
        <PrivateRoute path="/tool">
          <ToolPage />
        </PrivateRoute>
        <PrivateRoute path="/realTime">
          <StockSocket />
        </PrivateRoute>
      </Switch>
    </ErrorBoundary>
  );
}
