// filterActions.js

import { SET_SCREW_FILTER_VALUES, SET_PLATE_FILTER_VALUES, SET_BOLT_FILTER_VALUES, SET_FILTER_TYPE } from '../Constants/filterConstants.js';

export const setScrewFilterValues = (values) => ({
  type: SET_SCREW_FILTER_VALUES,
  payload: values,
});

export const setPlateFilterValues = (values) => ({
  type: SET_PLATE_FILTER_VALUES,
  payload: values,
});

export const setBoltFilterValues = (values) => ({
  type: SET_BOLT_FILTER_VALUES,
  payload: values,
});

export const setFilterType = (filterType) => ({
  type: SET_FILTER_TYPE,
  payload: filterType,
});
