import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './../src/screens/Home'

export default function App() {
  return (
    <Router>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
    </Router>
  );
}
