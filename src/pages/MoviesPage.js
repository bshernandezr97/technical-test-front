import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { MoviesForm } from "../components/movies/MoviesForm";
import { MoviesTable } from "../components/movies/MoviesTable";
import { showMovieModal } from "../redux/actions/ui";

export const MoviesPage = () => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(showMovieModal());
  };

  return (
    <div>
      <MoviesForm />
      <div className="page__container">
        <MoviesTable />
        <button onClick={handleOpenModal} className="btn btn-primary mt-5">
          <FontAwesomeIcon className="mr-5" icon={faPlus} />
          Add Movie
        </button>
      </div>
    </div>
  );
};
