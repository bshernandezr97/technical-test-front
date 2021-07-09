import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Swal from "sweetalert2";
import { Navbar } from "../components/ui/Navbar";
import { ClasificationPage } from "../pages/ClasificationPage";
import { MoviesPage } from "../pages/MoviesPage";
import { startLoadClasification } from "../redux/actions/clasification";
import { startLoadMovie } from "../redux/actions/movie";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);

  useEffect(() => {
    dispatch(startLoadClasification());
    dispatch(startLoadMovie());
  }, [dispatch]);

  useEffect(() => {
    if(loading) {
      Swal.showLoading(Swal.getDenyButton());
    }
  }, [loading]);

  return (
    <Router>
      <div className="container">
        <Navbar />
        <Switch>
          <Route exact path="/movies" component={MoviesPage} />
          <Route exact path="/clasification" component={ClasificationPage} />
          <Redirect to="/movies" />
        </Switch>
      </div>
    </Router>
  );
};
