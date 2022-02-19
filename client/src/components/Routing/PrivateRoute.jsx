import React from "react";
import { Route, Redirect } from "react-router-dom";

import { auth } from "../../utilities";

export default function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        return auth.isLogin ? children : <Redirect to="/user/login" />;
      }}
    />
  );
}
