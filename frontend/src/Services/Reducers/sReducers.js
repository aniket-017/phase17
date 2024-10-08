// sReducers.js

import {
    UPLOAD_SCREW_CSV_REQUEST,
    UPLOAD_SCREW_CSV_SUCCESS,
    UPLOAD_SCREW_CSV_FAIL,
    ALL_SCREWS_REQUEST,
    ALL_SCREWS_SUCCESS,
    ALL_SCREWS_FAIL,
    SCREW_DETAILS_REQUEST,
    SCREW_DETAILS_SUCCESS,
    SCREW_DETAILS_FAIL,
    CLEAR_ERRORS,
  } from '../Constants/sConstants';
  
  export const screwsReducer = (state = { screws: [] }, action) => {
    switch (action.type) {
      case ALL_SCREWS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ALL_SCREWS_SUCCESS:
        return {
          loading: false,
          screws: action.payload,
        };
      case ALL_SCREWS_FAIL:
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
  
  export const screwDetailsReducer = (state = { screw: {} }, action) => {
    switch (action.type) {
      case SCREW_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case SCREW_DETAILS_SUCCESS:
        return {
          loading: false,
          screw: action.payload,
        };
      case SCREW_DETAILS_FAIL:
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
  
  export const uploadScrewCSVReducer = (state = {}, action) => {
    switch (action.type) {
      case UPLOAD_SCREW_CSV_REQUEST:
        return {
          loading: true,
        };
      case UPLOAD_SCREW_CSV_SUCCESS:
        return {
          loading: false,
          success: true,
          data: action.payload,
        };
      case UPLOAD_SCREW_CSV_FAIL:
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
  