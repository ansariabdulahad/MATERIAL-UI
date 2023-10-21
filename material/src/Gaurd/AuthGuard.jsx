import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'universal-cookie';

const AuthGuard = () => {
    let isLogged = false;
    const cookie = new Cookies();
    const user = cookie.get("authToken");

    isLogged = user ? true : false;

    return isLogged ? <Outlet /> : <Navigate to={"/login"} />
}

export default AuthGuard;
