// platesReducer.js

import {
    ALL_PLATES_REQUEST,
    ALL_PLATES_SUCCESS,
    ALL_PLATES_FAIL,
    PLATE_DETAILS_REQUEST,
    PLATE_DETAILS_SUCCESS,
    PLATE_DETAILS_FAIL,
    CLEAR_ERRORS,
} from "../Constants/plateConstants.js";

export const platesReducer = (state = { plates: [] }, action) => {
    switch (action.type) {
        case ALL_PLATES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ALL_PLATES_SUCCESS:
            return {
                loading: false,
                plates: action.payload,
            };
        case ALL_PLATES_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const plateDetailsReducer = (state = { plate: {} }, action) => {
    switch (action.type) {
        case PLATE_DETAILS_REQUEST:
            return {
                loading: true,
                ...state,
            };
        case PLATE_DETAILS_SUCCESS:
            return {
                loading: false,
                plate: action.payload,
            };
        case PLATE_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
