import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ClasificationPage } from "../pages/ClasificationPage";
import { MoviesPage } from "../pages/MoviesPage";

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/movies" component={MoviesPage} />
          <Route path="/clasification" component={ClasificationPage} />
          <Redirect to="/movies" />
        </Switch>
      </div>
    </Router>
  );
};
