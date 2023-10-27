// REGISTER CODE 
return setRequest({
    method: "POST",
    url: "/signup",
    data: input
});


// User defined Hooks
const [httpResponse, httpError, httpLoader] = useHttp(request);

const [request, setRequest] = useState(null);



useEffect(() => {
    if (request) {
        if (httpResponse) {
            // SET COOKIE WHEN SIGNUP
            cookie.set("authToken", httpResponse.token, { maxAge: 86400 });
            return setSweetAlert({
                state: true,
                message: "Signup is success, Try to login !",
                icon: "success",
                title: "SUCCESS!"
            });
        }

        if (httpError) {
            return setSweetAlert({
                state: true,
                message: httpError.data.message,
                icon: "error",
                title: "FAILED!"
            });
        }
    }
}, [httpResponse, httpError, httpLoader]);