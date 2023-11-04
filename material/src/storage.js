import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { signupReducer } from "./Component/Signup/signup.reducer";
import { loginReducer } from "./Component/Login/login.reducer";
import { forgotReducer } from "./Component/Forgot/forgot.reducer";

const middlewares = applyMiddleware(
    logger,
    thunk
);

const root = combineReducers({
    signupReducer,
    loginReducer,
    forgotReducer
})

const storage = createStore(root, {}, middlewares);

export default storage;