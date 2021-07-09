import Swal from 'sweetalert2';
import { types } from '../types/types';
import { startLoadMovie } from './movie';
import { hideLoading, showLoading } from './ui';

const endPoint = process.env.REACT_APP_API + '/clasification';

// Synchronous actions

export const addClasification = (clasification) => ({
  type: types.addClasification,
  payload: clasification,
});

export const deleteClasification = (clasificationId) => ({
  type: types.deleteClasification,
  payload: clasificationId,
});

export const updateClasification = (clasification) => ({
  type: types.updateClasification,
  payload: clasification,
});

export const loadClasifications = (clasifications) => ({
  type: types.loadClasifications,
  payload: clasifications,
});

export const setActiveClasification = (clasification) => ({
  type: types.setActiveClassification,
  payload: clasification,
});

export const clearActiveClasifications = () => ({
  type: types.clearActiveClassification
});

// Asynchronous actions

export const startAddClasification = (clasification) => {
  return async (dispatch) => {
    dispatch(showLoading());
    const res = await fetch(endPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clasification),
    });
    const clasificationRes = await res.json();
    dispatch(hideLoading());
    if(clasificationRes.ok) {
      dispatch(addClasification(clasificationRes.clasification));
      Swal.fire('Information', 'Classification added successfully', 'success');
    } else {
      Swal.fire('Information', clasificationRes.message, 'error');
    }
  };
};

export const startDeleteClasification = (clasificationId) => {
  return async (dispatch) => {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(showLoading());
        const res = await fetch(`${endPoint}/${clasificationId}`, {
          method: 'DELETE'
        });
        const clasificationRes = await res.json();
        dispatch(hideLoading());
        if(clasificationRes.ok) {
          dispatch(deleteClasification(clasificationId));
          dispatch(startLoadMovie());
          Swal.fire('Information', 'Classification deleted successfully', 'success');
        } else {
          Swal.fire('Information', clasificationRes.message, 'error');
        }
      }
    }) 
  };
};

export const startUpdateClasification = (clasification) => {
  return async (dispatch) => {
    dispatch(showLoading());
    const res = await fetch(`${endPoint}/${clasification._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clasification),
    });
    const clasificationRes = await res.json();
    dispatch(hideLoading());
    if(clasificationRes.ok) {
      dispatch(updateClasification(clasificationRes.clasification));
      dispatch(startLoadMovie());
      Swal.fire('Information', 'Classification updated successfully', 'success');
    } else {
      Swal.fire('Information', clasificationRes.message, 'error');
    }
  };
};

export const startLoadClasification = () => {
  return async (dispatch) => {
    const res = await fetch(endPoint);
    const clasificationRes = await res.json();
    console.log(clasificationRes.clasifications);
    if(clasificationRes.ok) {
      dispatch(loadClasifications(clasificationRes.clasifications));
    } else {
      Swal.fire('Information', clasificationRes.message, 'error');
    }
  };
};
