import React from "react";
import DividendSchedule from "./component/DividendSchedule";
import DividendDetail from "./component/DividendDetail";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/page2">page2</Link>
            </li>
          </ul>
        </nav> */}

      <Switch>
        <Route path="/detail/:stockNo/:name?">
          <DividendDetail />
        </Route>
        <Route path="/">
          <DividendSchedule />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
