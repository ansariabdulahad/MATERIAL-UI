import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    USER_NOT_FOUND,
    INCORRECT_PASSWORD,
    LOGOUT_FAILED,
    LOGOUT_SUCCESS
} from "./login.state";

const Modal = {
    isLoading: false,
    userNotFound: false,
    inCorrectPassword: false,
    isLogged: false,
    isLogout: false,
    data: null
}

const loginReducer = (state = Modal, action) => {

    switch (action.type) {
        case LOGIN_REQUEST: return {
            ...state,
            isLoading: true,
            userNotFound: false,
            inCorrectPassword: false,
            isLogged: false,
            isLogout: false,
            data: null
        }
        case LOGIN_SUCCESS: return {
            ...state,
            isLoading: false,
            userNotFound: false,
            inCorrectPassword: false,
            isLogged: true,
            isLogout: false,
            data: action.payload
        }
        case LOGOUT_SUCCESS: return {
            ...state,
            isLoading: false,
            userNotFound: false,
            inCorrectPassword: false,
            isLogged: false,
            isLogout: true,
            data: null
        }
        case LOGOUT_FAILED: return {
            ...state,
            isLoading: false,
            userNotFound: false,
            inCorrectPassword: false,
            isLoading: true,
            isLogout: false,
        }
        case USER_NOT_FOUND: return {
            ...state,
            isLoading: false,
            userNotFound: true,
            inCorrectPassword: false,
            isLogged: false,
            isLogout: false,
            data: null
        }
        case INCORRECT_PASSWORD: return {
            ...state,
            isLoading: false,
            userNotFound: false,
            inCorrectPassword: true,
            isLogged: false,
            isLogout: false,
            data: null
        }
        default: return state;
    }

}

export {
    loginReducer
};