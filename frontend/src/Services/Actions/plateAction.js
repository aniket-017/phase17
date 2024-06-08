import axios from "axios";
import {
  ALL_PLATES_FAIL,
  ALL_PLATES_REQUEST,
  ALL_PLATES_SUCCESS,
  PLATE_DETAILS_REQUEST,
  PLATE_DETAILS_FAIL,
  PLATE_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../Constants/plateConstants";

export const getPlates = (keyword = "", currentPage = 1, selectedFilters = {}) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PLATES_REQUEST });

    // Convert selected filters object into query parameters
    const filtersQuery = Object.entries(selectedFilters)
      .map(([filter, selectedOption]) => `${filter}=${encodeURIComponent(selectedOption)}`)
      .join('&');

    // Append selected filters query parameters to the request URL
    let link = `/aak/l1/plates?keyword=${keyword}&page=${currentPage}`;
    if (filtersQuery) {
      link += `&${filtersQuery}`;
    }

    const { data } = await axios.get(link);

    dispatch({
      type: ALL_PLATES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PLATES_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const getPlateDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PLATE_DETAILS_REQUEST });

    const { data } = await axios.get(`/aak/l1/plate/${id}`);

    dispatch({
      type: PLATE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PLATE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
