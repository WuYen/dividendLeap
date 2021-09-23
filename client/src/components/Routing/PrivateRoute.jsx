import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import auth from "../../utils/auth";

export default function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        return auth.isLogin ? children : <Redirect to="/login" />;
      }}
    />
  );
}
