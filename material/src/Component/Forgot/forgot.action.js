import axios from 'axios';
import { CHANGE_PASSWORD_REQUEST, EMAIL_SENDED, FORGOT_REQUEST, INVALID_CODE, PASSWORD_CHANGED, USER_NOT_FOUND } from './forgot.state';

axios.defaults.baseURL = 'http://localhost:3030';

const forgotRequest = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    return async (dispatch) => {
        try {
            dispatch({
                type: FORGOT_REQUEST
            })
            const response = await axios({
                method: 'POST',
                url: '/forgot-password',
                data: {
                    email: email
                }
            });
            dispatch({
                type: EMAIL_SENDED
            })
        } catch (error) {
            dispatch({
                type: USER_NOT_FOUND
            })
        }
    }
}

const changePassword = (e, formData) => {
    e.preventDefault();
    return async (dispatch) => {
        try {
            dispatch({
                type: CHANGE_PASSWORD_REQUEST
            })
            const response = await axios({
                method: 'PUT',
                url: '/forgot-password',
                data: formData
            });
            dispatch({
                type: PASSWORD_CHANGED
            })
        } catch (error) {
            dispatch({
                type: INVALID_CODE
            })
        }
    }
}

export {
    forgotRequest,
    changePassword
}