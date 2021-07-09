import { types } from "../types/types";

const initialState = {
    loading: false,
    movieModal: false,
    classificationModal: false
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.showLoading:
            return {
                loading: true
            };
        case types.hideLoading:
            return {
                loading: false
            }
        case types.showClassificationModal:
            return {
                ...state,
                classificationModal: true
            };
        case types.hideClassificationModal:
            return {
                ...state,
                classificationModal: false
            }
        case types.showMovieModal:
            return {
                ...state,
                movieModal: true
            };
        case types.hideMovieModal:
            return {
                ...state,
                movieModal: false
            }
        default:
            return state;
    }
}