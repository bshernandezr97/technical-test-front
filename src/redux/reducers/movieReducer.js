import { types } from "../types/types";

const initialState = {
  movies: [],
  active: null,
};

export const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.addMovie:
      return {
        ...state,
        movies: [action.payload, ...state.movies],
      };
    case types.deleteMovie:
      return {
        ...state,
        movies: state.movies.filter((m) => m._id !== action.payload),
      };
    case types.loadMovies:
      console.log(action.payload);
      return {
        ...state,
        movies: action.payload,
      };
    case types.updateMovie:
      return {
        ...state,
        movies: state.movies.map((m) => {
          if (m._id === action.payload._id) {
            return {
              ...action.payload,
            };
          } else {
            return m;
          }
        }),
      };
    case types.setActiveMovie:
      return {
        ...state,
        active: action.payload,
      };
    case types.clearActiveMovie:
      return {
        ...state,
        active: null,
      };
    default:
      return state;
  }
};
