import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { ClassificationForm } from "../components/clasification/ClasificationForm";
import { ClasificationTable } from "../components/clasification/ClasificationTable";
import { showClassificationModal } from "../redux/actions/ui";

export const ClasificationPage = () => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(showClassificationModal());
  };
  return (
    <div>
      <ClassificationForm />
      <div className="page__container">
        <ClasificationTable />
        <button onClick={handleOpenModal} className="btn btn-primary mt-5">
          <FontAwesomeIcon className="mr-5" icon={faPlus} />
          Add Classication
        </button>
      </div>
    </div>
  );
};
