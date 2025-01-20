import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/user"

const rootReducer = combineReducers({
    auth:authReducer,
})

export default rootReducer

