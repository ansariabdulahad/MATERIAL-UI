import { REVENUE_FAILED, REVENUE_REQUEST, REVENUE_SUCCESS } from "./revenue.state";
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3030';

const revenueRequest = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: REVENUE_REQUEST
            });

            const { data } = await axios({
                method: 'GET',
                url: '/revenue-updates'
            });

            dispatch({
                type: REVENUE_SUCCESS,
                payload: data
            });

        } catch (error) {
            dispatch({
                type: REVENUE_FAILED
            })
        }
    }
}

export {
    revenueRequest
}