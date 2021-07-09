import { types } from "../types/types";

const initialState = {
  clasifications: [],
  active: null,
};

export const clasificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.addClasification:
      return {
        ...state,
        clasifications: [action.payload, ...state.clasifications],
      };
    case types.deleteClasification:
      return {
        ...state,
        clasifications: state.clasifications.filter((c) => c._id !== action.payload),
      };
    case types.loadClasifications:
      console.log(action.payload);
      return {
        ...state,
        clasifications: action.payload
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
    case types.setActiveClassification:
      return {
        ...state,
        active: action.payload,
      };
    case types.clearActiveClassification:
      return {
        ...state,
        active: null,
      };
    default:
      return state;
  }
};
