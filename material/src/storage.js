import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { signupReducer } from "./Component/Signup/signup.reducer";
import { loginReducer } from "./Component/Login/login.reducer";
import { forgotReducer } from "./Component/Forgot/forgot.reducer";
import { revenueReducer } from "./Component/AdminPanel/Dashboard/Modern/Revenue/revenue.reducer";
import { adminReducer } from "./Component/AdminPanel/admin.reducer";

const middlewares = applyMiddleware(
    // logger, // if we need to know which action is dispatched in console then enabled this logger.
    thunk
);

const root = combineReducers({
    signupReducer,
    loginReducer,
    forgotReducer,
    revenueReducer,
    adminReducer
})

const storage = createStore(root, {}, middlewares);

export default storage;