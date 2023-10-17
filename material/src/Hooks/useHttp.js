import axios from 'axios';
import { useEffect, useState } from 'react';

const useHttp = (request) => {

    const [httpResponse, setHttpResponse] = useState(null);
    const [httpError, setHttpError] = useState(null);

    const ajax = () => {
        axios(request)
            .then((response) => {
                setHttpResponse(response.data);
            }).catch((error) => {
                setHttpError(error);
            })
    }

    useEffect(ajax, [request]);

    return [httpResponse, httpError];
}

export default useHttp;