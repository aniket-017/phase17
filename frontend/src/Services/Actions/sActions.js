// sActions.js

import axios from "axios";
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
} from "../Constants/sConstants";

export const uploadScrewCSV = (file) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_SCREW_CSV_REQUEST });

    const formData = new FormData();
    formData.append("file", file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post("/api/importScrews", formData, config);

    dispatch({ type: UPLOAD_SCREW_CSV_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPLOAD_SCREW_CSV_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getScrews = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_SCREWS_REQUEST });

    const { data } = await axios.get("/api/screws");

    dispatch({ type: ALL_SCREWS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_SCREWS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getScrewDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SCREW_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/screws/${id}`);

    dispatch({ type: SCREW_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SCREW_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
