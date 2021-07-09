import Swal from "sweetalert2";
import { types } from "../types/types";
import { hideLoading, showLoading } from "./ui";

const endPoint = process.env.REACT_APP_API + "/movie";

// Synchronous actions

export const addMovie = (movie) => ({
  type: types.addMovie,
  payload: movie,
});

export const deleteMovie = (movieId) => ({
  type: types.deleteMovie,
  payload: movieId,
});

export const updateMovie = (movie) => ({
  type: types.updateMovie,
  payload: movie,
});

export const loadMovies = (movies) => ({
  type: types.loadMovies,
  payload: movies,
});

export const setActiveMovie = (movie) => ({
  type: types.setActiveMovie,
  payload: movie,
});

export const clearActiveMovie = () => ({
  type: types.clearActiveMovie,
});

// Asynchronous actions

export const startAddMovie = (movie) => {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { clasifications } = getState().clasification;
    const clasification = clasifications.find(
      (c) => c._id === movie.clasification
    );
    const res = await fetch(endPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });
    const movieRes = await res.json();
    dispatch(hideLoading());
    if(movieRes.ok) {
      dispatch(
        addMovie({
          ...movieRes.movie,
          clasification,
        })
      );
      Swal.fire('Information', 'Movie added successfully', 'success');
    } else {
      Swal.fire('Information', movieRes.message, 'error');
    }
  };
};

export const startDeleteMovie = (movieId) => {
  return async (dispatch) => {
    dispatch(showLoading());
    const res = await fetch(`${endPoint}/${movieId}`, {
      method: "DELETE",
    });
    const movieRes = await res.json();
    console.log(movieRes);
    dispatch(hideLoading());
    if(movieRes.ok) {
      dispatch(deleteMovie(movieId));
      Swal.fire('Information', 'Movie deleted successfully', 'success');
    } else {
      Swal.fire('Information', movieRes.message, 'error');
    }
  };
};

export const startUpdateMovie = (movie) => {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { clasifications } = getState().clasification;
    const clasification = clasifications.find(
      (c) => c._id === movie.clasification
    );
    const res = await fetch(`${endPoint}/${movie._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });
    const movieRes = await res.json();
    dispatch(hideLoading());
    if(movieRes.ok) {
      dispatch(
        updateMovie({
          ...movieRes.movie,
          clasification,
        })
      );
      Swal.fire('Information', 'Movie updated successfully', 'success');
    } else {
      Swal.fire('Information', movieRes.message, 'error');
    }
  };
};

export const startLoadMovie = () => {
  return async (dispatch) => {
    const res = await fetch(endPoint);
    const movieRes = await res.json();
    if(movieRes.ok) {
      dispatch(loadMovies(movieRes.movies));
    } else {
      Swal.fire('Information', movieRes.message, 'error');
    }
  };
};
