import { REVENUE_FAILED, REVENUE_REQUEST, REVENUE_SUCCESS } from "./revenue.state";


const Model = {
    isLoading: null,
    success: false,
    failed: false,
    data: null
};

const revenueReducer = (state = Model, action) => {
    switch (action.type) {
        case REVENUE_REQUEST: return {
            ...state,
            isLoading: true,
            success: false,
            failed: false,
            data: null
        }
        case REVENUE_SUCCESS: return {
            ...state,
            isLoading: false,
            success: true,
            failed: false,
            data: action.payload
        }
        case REVENUE_FAILED: return {
            ...state,
            isLoading: false,
            success: false,
            failed: true,
            data: null
        }
        default: return state
    }
}

export {
    revenueReducer
}