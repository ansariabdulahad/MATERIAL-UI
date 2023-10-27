import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { signupReducer } from "./Component/Signup/signup.reducer";

const middlewares = applyMiddleware(
    logger,
    thunk
);

const storage = createStore(signupReducer, {}, middlewares);

export default storage;