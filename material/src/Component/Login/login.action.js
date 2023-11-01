import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    USER_NOT_FOUND,
    INCORRECT_PASSWORD
} from "./login.state"
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3030';

const loginRequest = (user) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: LOGIN_REQUEST,
                payload: []
            })
            const response = await axios({
                method: 'POST',
                url: '/login',
                data: user
            });
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            if (error.response.status === 404) {
                dispatch({
                    type: USER_NOT_FOUND
                })
            }
            else {
                dispatch({
                    type: INCORRECT_PASSWORD
                })
            }
        }
    }
}

export default loginRequest;