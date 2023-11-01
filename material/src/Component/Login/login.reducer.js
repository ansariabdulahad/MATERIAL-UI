import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    USER_NOT_FOUND,
    INCORRECT_PASSWORD
} from "./login.state";

const Modal = {
    isLoading: false,
    userNotFound: false,
    inCorrectPassword: false,
    isLogged: false,
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
            data: null
        }
        case LOGIN_SUCCESS: return {
            ...state,
            isLoading: false,
            userNotFound: false,
            inCorrectPassword: false,
            isLogged: true,
            data: action.payload
        }
        case USER_NOT_FOUND: return {
            ...state,
            isLoading: false,
            userNotFound: true,
            inCorrectPassword: false,
            isLogged: false,
            data: null
        }
        case INCORRECT_PASSWORD: return {
            ...state,
            isLoading: false,
            userNotFound: false,
            inCorrectPassword: true,
            isLogged: false,
            data: null
        }
        default: return state;
    }

}

export {
    loginReducer
};