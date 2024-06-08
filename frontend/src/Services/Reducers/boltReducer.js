import {
  ALL_BOLTS_REQUEST,
  ALL_BOLTS_SUCCESS,
  ALL_BOLTS_FAIL,
  BOLT_DETAILS_REQUEST,
  BOLT_DETAILS_SUCCESS,
  BOLT_DETAILS_FAIL,
  BOLT_UPDATE_REQUEST,
  BOLT_UPDATE_SUCCESS,
  BOLT_UPDATE_FAIL,
  BOLT_DELETE_REQUEST,
  BOLT_DELETE_SUCCESS,
  BOLT_DELETE_FAIL,
  CLEAR_ERRORS,
} from "../Constants/boltConstants.js";

export const boltsReducer = (state = { bolts: [] }, action) => {
  switch (action.type) {
    case ALL_BOLTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_BOLTS_SUCCESS:
      return {
        loading: false,
        bolts: action.payload,
      };
    case ALL_BOLTS_FAIL:
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

export const boltDetailsReducer = (state = { bolt: {} }, action) => {
  switch (action.type) {
    case BOLT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case BOLT_DETAILS_SUCCESS:
      return {
        loading: false,
        bolt: action.payload,
      };
    case BOLT_DETAILS_FAIL:
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
