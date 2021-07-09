import React, { useEffect, useRef } from "react";
import Modal from "react-modal";
import validator from 'validator'
import { useDispatch, useSelector } from "react-redux";
import { modalStyles } from "../../fixtures/modalStyles";
import { useForm } from "../../hooks/useForm";
import { clearActiveMovie, startAddMovie, startUpdateMovie } from "../../redux/actions/movie";
import { hideMovieModal } from "../../redux/actions/ui";
import Swal from "sweetalert2";

Modal.setAppElement("#root");

const initialState = {
  name: "",
  director: "",
  clasification: "",
}
export const MoviesForm = () => {
  const [formValues, handleChange, reset] = useForm(initialState);
  const { name, director, clasification } = formValues;
  const { active } = useSelector(state => state.movies);
  const isLoadActive = useRef(false);
  const { movieModal } = useSelector((state) => state.ui);
  const { clasifications } = useSelector((state) => state.clasification);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    isLoadActive.current = false;
    dispatch(hideMovieModal());
    dispatch(clearActiveMovie());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(validateForm()) {
      if(active) {
        dispatch(startUpdateMovie(
          formValues
        ));
      } else {
        dispatch(startAddMovie(formValues));
      }
      reset(initialState);
      handleCloseModal();
    }
  }

  const validateForm = () => {
    if(validator.isEmpty(name)) {
      Swal.fire('Information', 'Name cannot be empty', 'error');
      return false;
    } else if(validator.isEmpty(director)) {
      Swal.fire('Information', 'Director cannot be empty', 'error');
      return false;
    } else if(validator.isEmpty(clasification)) {
      Swal.fire('Information', 'Classification cannot be empty, If there are not classification you can create one in classification menu', 'error');
      return false;
    }
    return true;
  }

  useEffect(() => {
    if(active && !isLoadActive.current) {
      isLoadActive.current = true;
      const { clasification, ...movie } = active;
      reset({
        ...movie,
        clasification: clasification?._id
      })
    }
  }, [active, reset])

  return (
    <Modal isOpen={movieModal} style={modalStyles}>
      <button
        className="btn btn-danger btn-close-modal"
        onClick={handleCloseModal}
      >
        Close
      </button>
      <div className="form__title mb-5">Movie</div>
      <form onSubmit={handleSubmit} className="form__app">
        <label>Name:</label>
        <input value={name} name="name" onChange={handleChange} className="mb-5" />
        <label>Director:</label>
        <input value={director} name="director" onChange={handleChange}  className="mb-5" />
        <label>Classification:</label>
        <select value={clasification} name="clasification" onChange={handleChange}  className="mb-5">
          <option></option>
          {clasifications.map((c) => {
            return (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            );
          })}
        </select>
        <button className="btn btn-success mt-5">Save</button>
      </form>
    </Modal>
  );
};
