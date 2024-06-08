// import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from '@reduxjs/toolkit'
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productsReducer } from "./Services/Reducers/productReducer";
import filterReducer, { filterreducers } from './Services/Reducers/filterReducer';
import { forgotPasswordReducer, profileReducer, userReducer } from './Services/Reducers/userReducer';
import cartReducer from './Services/Reducers/cartReducer';
import { screwDetailsReducer, screwsReducer } from './Services/Reducers/screwsReducer';
import { boltDetailsReducer, boltsReducer } from './Services/Reducers/boltReducer';
import { plateDetailsReducer, platesReducer } from './Services/Reducers/plateReducer';
import { brewReducer } from './Services/Reducers/brewReducer';
import { uploadScrewCSVReducer } from './Services/Reducers/sReducers';

// import { filterreducers } from './Services/Reducers/userReducer';



// const reducer = combineReducers({
//   venues:productsReducer,
// });

// let initialState = {};

// const middleware = [thunk];

const store = configureStore({
  reducer:{
    products: productsReducer,
    productdetails: productDetailsReducer,
    screws: screwsReducer,
    bolts: boltsReducer,
    plates: platesReducer,
    filter: filterReducer,
    screwdetails : screwDetailsReducer,
    boltdetails: boltDetailsReducer,
    platedetails: plateDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    brew: brewReducer,
    uploadScrewCSV: uploadScrewCSVReducer,
  },
    // {reducer},
    // initialState,
    // composeWithDevTools(applyMiddleware(...middleware))
  });

export default store;