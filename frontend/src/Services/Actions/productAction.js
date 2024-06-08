import axios from "axios";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_RESET,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RESET,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_RESET,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_RESET,
  CLEAR_ERRORS,
} from "../Constants/productConstants";

export const getProduct = (keyword="",currentPage=1  ,CertificationStatus, surfaceFinish,hotForge,coldForge,shade,coatedMaterial ) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });
    let link = `/aak/l1/venues?keyword=${keyword}&page=${currentPage}`;


    let filterQuery = "";
    if(CertificationStatus){
    filterQuery += `&CertificationStatus=${CertificationStatus}`;
    }
    if(surfaceFinish){
      filterQuery += `&surfaceFinish=${surfaceFinish}`;
    }
    
    // let allCoatedMaterial = [ ];
    // if (coatedMaterial) {
    //   filterQuery += `&CoatedMaterial=${coatedMaterial}`;
    // }else{
    //   filterQuery += `&CoatedMaterial=${allCoatedMaterial.join(",")}`;
    // }
    
    // if(coatedMaterial){
    
      link = `/aak/l1/venues?keyword=${keyword}&page=${currentPage}${filterQuery}`;
      // link = `/aak/l1/venues?keyword=${keyword}&page=${currentPage}&CoatedMaterial=${coatedMaterial}`;
    // }
    
   

    const { data } = await axios.get(link);
    dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload:data,
    })
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// if(CertificationStatus){
    //   link = `/aak/l1/venues?keyword=${keyword}&page=${currentPage}&CertificationStatus=${CertificationStatus}`;
    // }

// if(surfaceFinish){
    //   link = `/aak/l1/venues?keyword=${keyword}&page=${currentPage}&SurfaceFinish=${surfaceFinish}`;
    // }
    // if(hotForge){
    //   link = `/aak/l1/venues?keyword=${keyword}&page=${currentPage}&HotForge=${hotForge}`;
    // }
    // if(coldForge){
    //   link = `/aak/l1/venues?keyword=${keyword}&page=${currentPage}&ColdForge=${coldForge}`;
    // }
    // else if(shade){
    //   console.log("shadedd25");
    //   link = `/aak/l1/venues?keyword=${keyword}&page=${currentPage}&Shade=${shade}`;
    // }

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/aak/l1/venue/${id}`);

    
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.venue,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

 // Clearing Errors
 export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };