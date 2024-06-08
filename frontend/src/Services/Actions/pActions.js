// pActions.js

import axios from "axios";
import {
  UPLOAD_PLATE_CSV_REQUEST,
  UPLOAD_PLATE_CSV_SUCCESS,
  UPLOAD_PLATE_CSV_FAIL,
  ALL_PLATES_REQUEST,
  ALL_PLATES_SUCCESS,
  ALL_PLATES_FAIL,
  PLATE_DETAILS_REQUEST,
  PLATE_DETAILS_SUCCESS,
  PLATE_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../Constants/pConstants.js";

export const uploadPlateCSV = (file) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_PLATE_CSV_REQUEST });

    const formData = new FormData();
    formData.append("file", file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post("/api/importPlates", formData, config);

    dispatch({ type: UPLOAD_PLATE_CSV_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPLOAD_PLATE_CSV_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getPlates = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PLATES_REQUEST });

    const { data } = await axios.get("/api/plates");

    dispatch({ type: ALL_PLATES_SUCCESS, payload: data });
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

    const { data } = await axios.get(`/api/plates/${id}`);

    dispatch({ type: PLATE_DETAILS_SUCCESS, payload: data });
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
