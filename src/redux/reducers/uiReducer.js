import { types } from "../types/types";

const initialState = {
    loading: false
}

export const uiReducer = (state = initialState, action) => {
    switch (action.payload) {
        case types.showLoading:
            return {
                loading: true
            };
        case types.hideLoading:
            return {
                loading: false
            }
        default:
            return state;
    }
}