import {
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    Stack,
    TextField,
    InputAdornment,
    IconButton,
    OutlinedInput,
    FormControl,
    InputLabel
} from '@mui/material';
import { useEffect, useState } from 'react';
import {
    Link,
    useNavigate
} from 'react-router-dom';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import Cookies from 'universal-cookie';

import { loginRequest } from './login.action';

// MAIN COMPONNENT OF LOGIN PAGE
const Login = () => {
    const cookie = new Cookies();
    const dispatch = useDispatch();
    const { loginReducer } = useSelector(response => response);

    const [type, setType] = useState('password');
    const [disabled, setDisabled] = useState(true);
    const [remember, setRemember] = useState(false);
    const [input, setInput] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState({
        username: {
            state: false,
            message: ""
        },
        password: {
            state: false,
            message: ""
        }
    })
    const navigate = useNavigate();

    const checkForLogin = () => {
        if (loginReducer.userNotFound) {
            return setError((oldData) => {
                return {
                    ...oldData,
                    username: {
                        state: true,
                        message: "Username dose not exist !"
                    }
                }
            })
        }

        if (loginReducer.inCorrectPassword) {
            return setError((oldData) => {
                return {
                    ...oldData,
                    password: {
                        state: true,
                        message: "Wrong password !"
                    }
                }
            })
        }

        if (loginReducer.isLogged) {

            cookie.set('authToken', loginReducer.data.token, { maxAge: 86400 });
            return navigate('/admin-panel');
        }
    }

    const rememberMe = () => {
        const checkUser = localStorage.getItem('user');
        if (checkUser) {
            let user = JSON.parse(localStorage.getItem('user'));
            return (
                setInput(user),
                setRemember(true),
                setDisabled(false)
            );
        }
    }

    useEffect(() => {
        checkForLogin();
        rememberMe();
    }, [loginReducer]);

    // HANDLE INPUTS    
    const handleInput = (e) => {
        const input = e.target;
        const key = input.name;
        const value = input.value;

        return setInput((oldData) => {
            return {
                ...oldData,
                [key]: value
            }
        })
    }

    // YUP VALIDATION
    const schema = yup.object().shape({
        username: yup.string().required().email(),
        password: yup.string().required()
    });

    const validateSubmit = async () => {
        const isValid = await schema.isValid(input);
        return setDisabled(!isValid);
    }

    const validateInput = async (e) => {
        const key = e.target.name;
        try {
            await schema.validateAt(key, input);

            return setError((oldData) => {
                return {
                    ...oldData,
                    [key]: {
                        state: false,
                        message: ""
                    }
                }
            })

        } catch (error) {
            const message = error.errors;
            return setError((oldData) => {
                return {
                    ...oldData,
                    [key]: {
                        state: true,
                        message: message[0]
                    }
                }
            })
        }
    }

    //LOGIN FUNCTION CODING
    const login = (e) => {
        e.preventDefault();
        if (remember) {
            let string = JSON.stringify(input);
            localStorage.setItem('user', string);
        }
        dispatch(loginRequest(input));
    }

    // MAIN LOGIN PAGE DESIGN CODEING
    const design = (
        <>
            <Container>
                <Grid container>
                    <Grid item sm={6} xs={12}>One</Grid>
                    <Grid item sm={6} xs={12}>
                        <h1>Login</h1>
                        <form onSubmit={login}>
                            <Stack direction={'column'} spacing={3}>
                                <TextField
                                    name='username'
                                    label='Username'
                                    variant='outlined'
                                    error={error.username.state}
                                    helperText={error.username.message}
                                    value={input.username}
                                    onChange={handleInput}
                                    onKeyDown={validateSubmit}
                                    onInput={validateInput}
                                />
                                <FormControl>
                                    <InputLabel>Password</InputLabel>
                                    <OutlinedInput
                                        name='password'
                                        label='Password'
                                        type={type}
                                        variant='outlined'
                                        error={error.password.state}
                                        helperText={error.password.message}
                                        value={input.password}
                                        onChange={handleInput}
                                        onKeyDown={validateSubmit}
                                        onInput={validateInput}
                                        endAdornment={
                                            <InputAdornment>
                                                <IconButton
                                                    onClick={() => type === 'password' ? setType('text') : setType('password')}
                                                >
                                                    {
                                                        type === 'password' ?
                                                            <span className='material-icons-outlined'>visibility_off</span> :
                                                            <span className='material-icons-outlined'>visibility</span>
                                                    }
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <Stack
                                    direction={'row'}
                                    justifyContent={'space-between'}
                                    alignItems={'center'}
                                >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                size='large'
                                                onChange={() => setRemember(!remember)}
                                                checked={remember}
                                            />
                                        }
                                        label='Remember Me !'
                                    />
                                    <LoadingButton
                                        loading={loginReducer.isLoading}
                                        type='submit'
                                        variant='contained'
                                        color='secondary'
                                        sx={{
                                            px: 5,
                                            py: 1,
                                            fontWeight: 'bold',
                                            fontSize: "18px"
                                        }}
                                        disabled={disabled}
                                    >Login</LoadingButton>
                                </Stack>
                                <Stack
                                    direction={'row'}
                                    justifyContent={'space-between'}
                                    alignItems={'center'}
                                >
                                    <Link
                                        to={"/"}
                                        style={{
                                            textDecoration: 'none'
                                        }}
                                    >Create New Account !</Link>
                                    <Link
                                        to={"/forgot-password"}
                                        style={{
                                            textDecoration: 'none'
                                        }}
                                    >Forgot Password !</Link>
                                </Stack>
                            </Stack>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
    return design;
}

export default Login;