import {
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    Stack,
    TextField
} from '@mui/material';
import { useState } from 'react';
import {
    Link,
    useNavigate
} from 'react-router-dom';
import * as yup from 'yup';

// MAIN COMPONNENT OF LOGIN PAGE
const Login = () => {
    const [disabled, setDisabled] = useState(true);
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
        password: yup.string().required().min(4).max(8)
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
        navigate('/admin-panel')
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
                                <TextField
                                    name='password'
                                    label='Password'
                                    type='password'
                                    variant='outlined'
                                    error={error.password.state}
                                    helperText={error.password.message}
                                    value={input.password}
                                    onChange={handleInput}
                                    onKeyDown={validateSubmit}
                                    onInput={validateInput}
                                />
                                <Stack
                                    direction={'row'}
                                    justifyContent={'space-between'}
                                    alignItems={'center'}
                                >
                                    <FormControlLabel
                                        control={<Checkbox size='large' />}
                                        label='Remember Me !'
                                    />
                                    <Button
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
                                    >Login</Button>
                                </Stack>
                                <Stack
                                    direction={'row'}
                                    justifyContent={'space-between'}
                                    alignItems={'center'}
                                >
                                    <Link
                                        to={"#"}
                                        style={{
                                            textDecoration: 'none'
                                        }}
                                    >Create New Account !</Link>
                                    <Link
                                        to={"#"}
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