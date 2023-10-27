import { SIGNUP_ERROR, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "./signup.state"
import axios from "axios"

axios.defaults.baseURL = 'http://localhost:3030';

const signupRequest = (formData) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: SIGNUP_REQUEST,
                payload: []
            })
            const { data } = await axios({
                method: 'POST',
                url: '/signup',
                data: formData
            })

            dispatch({
                type: SIGNUP_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: SIGNUP_ERROR,
                error: error.response.data
            })
        }
    }
}

export {
    signupRequest
}