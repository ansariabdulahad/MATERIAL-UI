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
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { forgotRequest, changePassword } from './forgot.action';

const Forgot = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const forgotReducer = useSelector(response => response.forgotReducer);

    const [verifyForm, setVerifyForm] = useState(false);
    const [input, setInput] = useState({
        email: "",
        code: "",
        password: ""
    })
    const [error, setError] = useState({
        email: {
            state: false,
            message: ''
        },
        code: {
            state: false,
            message: ""
        }
    })

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

    const checkUser = () => {
        // if (forgotReducer && forgotReducer.success) {
        //     return setVerifyForm(true)
        // }

        if (forgotReducer.userNotFound) {
            return setError((oldData) => {
                return {
                    ...oldData,
                    email: {
                        state: true,
                        message: 'User not found !'
                    }
                }
            })
        }
    }

    const checkForNewPassword = () => {
        if (forgotReducer.passwordChanged) {
            return navigate('/login');
        }

        if (forgotReducer.invalidCode) {
            return setError((oldData) => {
                return {
                    ...oldData,
                    code: {
                        state: true,
                        message: 'Invalid verification code !'
                    }
                }
            })
        }
    }

    useEffect(() => {
        checkUser();
        checkForNewPassword();
    }, forgotReducer);

    const design = (
        <>
            <Container>
                <Grid container>
                    <Grid item sm={6} xs={12}>One</Grid>
                    <Grid item sm={6} xs={12}>
                        <h1>Forgot Password</h1>
                        {
                            !forgotReducer.success
                                ?
                                <form
                                    onSubmit={(e) => dispatch(forgotRequest(e))}
                                >
                                    <Stack spacing={3}>
                                        <TextField
                                            name='email'
                                            label='Email'
                                            variant='outlined'
                                            error={error.email.state}
                                            helperText={error.email.message}
                                            value={input.email}
                                            onChange={handleInput}
                                        />
                                        <div align='center'>
                                            <LoadingButton
                                                loading={forgotReducer.isLoading}
                                                type='submit'
                                                variant='contained'
                                            >Sent OTP</LoadingButton>
                                        </div>
                                    </Stack>
                                </form>
                                :
                                <form
                                    onSubmit={(e) => dispatch(changePassword(e, input))}
                                >
                                    <Stack spacing={3}>
                                        <TextField
                                            type='number'
                                            name='code'
                                            label='verification Code'
                                            variant='outlined'
                                            error={error.code.state}
                                            helperText={error.code.message}
                                            value={input.code}
                                            onChange={handleInput}
                                        />
                                        <TextField
                                            name='password'
                                            label='New Password'
                                            variant='outlined'
                                            value={input.password}
                                            onChange={handleInput}
                                        />
                                        <div align='center'>
                                            <LoadingButton
                                                type='submit'
                                                variant='contained'
                                            >Submit</LoadingButton>
                                        </div>
                                    </Stack>
                                </form>
                        }
                    </Grid>
                </Grid>
            </Container>
        </>
    );
    return design;
}

export default Forgot;