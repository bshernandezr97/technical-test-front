import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveMovie, startDeleteMovie } from "../../redux/actions/movie";
import { showMovieModal } from "../../redux/actions/ui";

export const MoviesTable = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.movies);

  const handleEdit = (movie) => {
    dispatch(setActiveMovie(movie));
    dispatch(showMovieModal());
  };

  const handleDelete = (movieId) => {
    dispatch(startDeleteMovie(movieId));
  };

  const renderItems = movies?.map((m) => {
    return (
      <tr key={m._id}>
        <td>{m.name}</td>
        <td>{m.director}</td>
        <td>{m.clasification?.name}</td>
        <td>
          <FontAwesomeIcon
            onClick={() => handleEdit(m)}
            className="table__action-primary"
            icon={faEdit}
          />
          <FontAwesomeIcon
            onClick={() => handleDelete(m._id)}
            className="table__action-danger ml-1"
            icon={faTrash}
          />
        </td>
      </tr>
    );
  });

  return (
    <div className="page__table-container">
      <table className="table__app">
        <thead>
          <tr>
            <th>Name</th>
            <th>Director</th>
            <th>Classification</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{renderItems}</tbody>
      </table>
    </div>
  );
};
