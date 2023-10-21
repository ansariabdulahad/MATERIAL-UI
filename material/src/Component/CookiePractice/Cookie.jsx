import Cookies from 'universal-cookie';

const Cookie = () => {
    const cookie = new Cookies();

    const setCookie = () => {
        cookie.set("username", "ahad@gmail.com", {
            path: "/",
            maxAge: 86400
        });
    }

    const design = (
        <div>
            <h1>Welcome to COOKIE</h1>
            <button
                onClick={setCookie}
            >Set Cookie</button>
            <button
                onClick={() => alert(cookie.get("username"))}
            >Get Cookie</button>
            <button
                onClick={() => cookie.remove("username")}
            >Remove Cookie</button>
        </div>
    );
    return design;
}

export default Cookie;