import { types } from '../types/types';

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

// Asynchronous actions

export const startAddClasification = (clasification) => {
  return async (dispatch) => {
    const res = await fetch(endPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clasification),
    });
    const clasificationRes = await res.json();
    dispatch(addClasification(clasificationRes));
  };
};

export const startDeleteClasification = (clasificationId) => {
  return async (dispatch) => {
    const res = await fetch(`${endPoint}/${clasificationId}`, {
      method: 'DELETE'
    });
    const clasificationRes = await res.json();
    console.log(clasificationRes);
    dispatch(deleteClasification(clasificationId));
  };
};

export const startUpdateClasification = (clasification) => {
  return async (dispatch) => {
    const res = await fetch(`${endPoint}/${clasification._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clasification),
    });
    const clasificationRes = await res.json();
    dispatch(updateClasification(clasificationRes));
  };
};

export const startLoadClasification = () => {
  return async (dispatch) => {
    const res = await fetch(endPoint);
    const clasificationRes = await res.json();
    dispatch(loadClasifications(clasificationRes));
  };
};
