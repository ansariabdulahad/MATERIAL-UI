import axios from 'axios';
import { useEffect, useState } from 'react';

// axios.defaults = "http://localhost:3030";

const useHttp = (request) => {

    const [httpResponse, setHttpResponse] = useState(null);
    const [httpError, setHttpError] = useState(null);
    const [httpLoader, setHttpLoader] = useState(true);

    const ajax = () => {
        axios(request)
            .then((response) => {
                setHttpResponse(response.data);
            }).catch((error) => {
                setHttpError(error);
            }).finally(() => {
                setHttpLoader(false);
            })
    }

    useEffect(() => {
        if (request) ajax();
    }, [request]);

    return [httpResponse, httpError, httpLoader];
}

export default useHttp;