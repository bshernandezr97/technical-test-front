import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { modalStyles } from "../../fixtures/modalStyles";
import validator from "validator";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  clearActiveClasifications,
  startAddClasification,
  startUpdateClasification,
} from "../../redux/actions/clasification";
import { hideClassificationModal } from "../../redux/actions/ui";

Modal.setAppElement("#root");

export const ClassificationForm = () => {
  const [name, setName] = useState("");
  const { classificationModal } = useSelector((state) => state.ui);
  const { active } = useSelector((state) => state.clasification);
  const isLoadActive = useRef(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (active) {
        dispatch(
          startUpdateClasification({
            ...active,
            name,
          })
        );
      } else {
        dispatch(startAddClasification({ name }));
      }
      setName("");
      handleCloseModal();
    }
  };

  const validateForm = () => {
    if (validator.isEmpty(name)) {
      Swal.fire("Information", "Name cannot be empty", "error");
      return false;
    }
    return true;
  };

  const handleCloseModal = () => {
    dispatch(hideClassificationModal());
    dispatch(clearActiveClasifications());
  };

  useEffect(() => {
    if (active && !isLoadActive.current) {
      isLoadActive.current = true;
      setName(active.name);
    }
  }, [active]);

  return (
    <Modal isOpen={classificationModal} style={modalStyles}>
      <button
        className="btn btn-danger btn-close-modal"
        onClick={handleCloseModal}
      >
        Close
      </button>
      <div className="form__title mb-5">Classification</div>
      <form onSubmit={handleSubmit} className="form__app">
        <label>Name:</label>
        <input value={name} onChange={handleChange} className="mb-5" />
        <button className="btn btn-success mt-5">Save</button>
      </form>
    </Modal>
  );
};
