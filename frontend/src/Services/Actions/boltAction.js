import axios from "axios";
import {
  ALL_BOLTS_FAIL,
  ALL_BOLTS_REQUEST,
  ALL_BOLTS_SUCCESS,
  BOLT_DETAILS_REQUEST,
  BOLT_DETAILS_FAIL,
  BOLT_DETAILS_SUCCESS,
  BOLT_UPDATE_REQUEST,
  BOLT_UPDATE_SUCCESS,
  BOLT_UPDATE_FAIL,
  BOLT_DELETE_REQUEST,
  BOLT_DELETE_SUCCESS,
  BOLT_DELETE_FAIL,
  CLEAR_ERRORS,
} from "../Constants/boltConstants";

// Get all bolts
export const getBolts = (keyword = "", currentPage = 1, selectedFilters = {}) => async (dispatch) => {
  try {
    dispatch({ type: ALL_BOLTS_REQUEST });

    const filtersQuery = Object.entries(selectedFilters)
      .map(([filter, selectedOption]) => `${filter}=${encodeURIComponent(selectedOption)}`)
      .join('&');

    let link = `/aak/l1/bolts?keyword=${keyword}&page=${currentPage}`;
    if (filtersQuery) {
      link += `&${filtersQuery}`;
    }

    const { data } = await axios.get(link);

    dispatch({
      type: ALL_BOLTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_BOLTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get bolt details
export const getBoltDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BOLT_DETAILS_REQUEST });

    const { data } = await axios.get(`/aak/l1/bolt/${id}`);

    dispatch({
      type: BOLT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOLT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update bolt
export const updateBolt = (id, boltData) => async (dispatch) => {
  try {
    dispatch({ type: BOLT_UPDATE_REQUEST });

    const { data } = await axios.put(`/aak/l1/bolt/${id}`, boltData);

    dispatch({
      type: BOLT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOLT_UPDATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete bolt
export const deleteBolt = (id) => async (dispatch) => {
  try {
    dispatch({ type: BOLT_DELETE_REQUEST });

    await axios.delete(`/aak/l1/bolt/${id}`);

    dispatch({ type: BOLT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: BOLT_DELETE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
