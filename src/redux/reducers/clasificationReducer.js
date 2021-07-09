import { types } from "../types/types";

const initialState = {
  clasifications: [],
  active: null,
};

export const clasificationReducer = (state = initialState, action) => {
  switch (action.payload) {
    case types.addClasification:
      return {
        ...state,
        clasifications: [action.payload, ...state.clasifications],
      };
    case types.deleteclasification:
      return {
        ...state,
        clasifications: state.clasifications.filter((c) => c._id !== action.payload),
      };
    case types.loadclasifications:
      return {
        ...state,
        clasifications: action.payload,
      };
    case types.updateClasification:
      return {
        ...state,
        clasifications: state.clasifications.map((c) => {
          if (c._id === action.payload._id) {
            return {
              ...action.payload,
            };
          } else {
            return c;
          }
        }),
      };
    case types.setActiveclasification:
      return {
        ...state,
        active: action.payload,
      };
    case types.clearActiveclasification:
      return {
        ...state,
        active: null,
      };
    default:
      return state;
  }
};
