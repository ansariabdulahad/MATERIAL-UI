import { Navigate, Outlet } from "react-router-dom";
import { useAsync } from 'react-async';
import Cookies from 'universal-cookie';
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3030';

const verifyToken = async ({ token }) => {
    try {
        const response = await axios.get('/verify-token/' + token);
        if (response.status === 200) {
            let user = JSON.stringify(response.data.data.data);
            sessionStorage.setItem('user', user);
            return { data: response.data, error: null };
        } else {
            throw new Error(`Server responded with status ${response.status}`);
        }
    } catch (error) {
        return { data: null, error: error.message };
    }
}


const AuthGuard = () => {
    const cookie = new Cookies();
    const token = cookie.get("authToken");
    const { data, error, isLoading } = useAsync({
        promiseFn: verifyToken,
        token: token
    });

    if (token) {
        return <Outlet />
    }
    else {
        return <Navigate to="/login" />
    }
}

export default AuthGuard;
