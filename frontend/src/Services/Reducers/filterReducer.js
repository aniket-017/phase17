// filterReducer.js

import { SET_SCREW_FILTER_VALUES, SET_PLATE_FILTER_VALUES, SET_BOLT_FILTER_VALUES, SET_FILTER_TYPE } from '../Constants/filterConstants.js';

const initialState = {
  screwFilters: {},
  plateFilters: {},
  boltFilters: {},
  filterType: 'screws', 
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SCREW_FILTER_VALUES:
      return {
        ...state,
        screwFilters: action.payload,
      };
    case SET_PLATE_FILTER_VALUES:
      return {
        ...state,
        plateFilters: action.payload,
      };
    case SET_BOLT_FILTER_VALUES:
      return {
        ...state,
        boltFilters: action.payload,
      };
    case SET_FILTER_TYPE:
      return {
        ...state,
        filterType: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
