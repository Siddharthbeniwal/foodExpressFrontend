import { configureStore } from "@reduxjs/toolkit";
import foodExpressReducer from './features/foodExpressSlice';

const store =  configureStore({
    reducer: foodExpressReducer
})

export default store;