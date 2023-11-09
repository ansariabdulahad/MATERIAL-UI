import { REVENUE_FAIL, REVENUE_REQUEST, REVENUE_SUCCESS } from "./revenue.state";
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3030';

const revenueRequest = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: REVENUE_REQUEST
            });

            const response = await axios({
                method: 'GET',
                url: 'revenue-updates'
            });

            console.log("RESPONSE :: ", response);

            dispatch({
                type: REVENUE_SUCCESS
            });

        } catch (error) {
            dispatch({
                type: REVENUE_FAIL
            })
        }
    }
}

export {
    revenueRequest
}