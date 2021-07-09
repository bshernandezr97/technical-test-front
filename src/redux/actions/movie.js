import { types } from '../types/types';

const endPoint = process.env.REACT_APP_API + '/movie';

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

// Asynchronous actions

export const startAddMovie = (movie) => {
  return async (dispatch) => {
    const res = await fetch(endPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    });
    const movieRes = await res.json();
    dispatch(addMovie(movieRes));
  };
};

export const startDeleteMovie = (movieId) => {
  return async (dispatch) => {
    const res = await fetch(`${endPoint}/${movieId}`, {
      method: 'DELETE'
    });
    const movieRes = await res.json();
    console.log(movieRes);
    dispatch(deleteMovie(movieId));
  };
};

export const startUpdateMovie = (movie) => {
  return async (dispatch) => {
    const res = await fetch(`${endPoint}/${movie._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    });
    const movieRes = await res.json();
    dispatch(updateMovie(movieRes));
  };
};

export const startLoadMovie = () => {
  return async (dispatch) => {
    const res = await fetch(endPoint);
    const movieRes = await res.json();
    dispatch(loadMovies(movieRes));
  };
};