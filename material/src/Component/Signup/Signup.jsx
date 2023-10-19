import { Button, Checkbox, FormControlLabel, FormGroup, Grid, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';

import useHttp from '../../Hooks/useHttp';

const Signup = () => {

    const signupForm = {
        fullname: "Abdul Ahad",
        mobile: "9545282408",
        email: "ahad@gmail.com",
        password: "Ahad@123"
    }

    const signupFormValidation = {
        fullname: {
            state: false,
            message: ""
        },
        mobile: {
            state: false,
            message: ""
        },
        email: {
            state: false,
            message: ""
        },
        password: {
            state: false,
            message: ""
        }
    }

    // Predefined Hooks
    const [input, setInput] = useState(signupForm);
    const [error, setError] = useState(signupFormValidation);
    const [checked, setChecked] = useState(false);
    const [request, setRequest] = useState(null);
    const [sweetAlert, setSweetAlert] = useState({
        state: false,
        message: "",
        icon: "default",
        title: ""
    });

    // User defined Hooks
    const [httpResponse, httpError, httpLoader] = useHttp(request);

    useEffect(() => {
        if (request) {
            if (httpResponse) {
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
                    message: "Signup Failed !",
                    icon: "error",
                    title: "FAILED!"
                });
            }
        }
    }, [httpResponse, httpError, httpLoader]);

    const Alert = () => {
        const a = (
            <SweetAlert
                title={sweetAlert.title}
                type={sweetAlert.icon}
                show={sweetAlert.state}
                showConfirm={true}
                onConfirm={() => { }}
                customButtons={
                    <Stack
                        direction={'row'}
                        spacing={3}
                    >
                        <Button
                            variant='outlined'
                            color='error'
                        >Cancel</Button>
                        <Button
                            variant='contained'
                            color='success'
                            sx={{
                                color: "white"
                            }}
                        >Login</Button>
                    </Stack>
                }
            >
                {sweetAlert.message}
            </SweetAlert>
        );

        return a;
    }

    const updateValue = (e) => {
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

    const requiredValidation = (e) => {
        const input = e.target;
        const key = input.name;
        const isRequired = validation(input); // calling...

        return setError((oldData) => {
            return {
                ...oldData,
                [key]: isRequired
            }
        })
    }

    const emailValidation = (e) => {
        const input = e.target;
        const key = input.name;
        const isRequired = validation(input); // calling...
        const isEmail = emailSyntax(input); // calling...

        return setError((oldData) => {
            return {
                ...oldData,
                [key]: (isRequired.state && isRequired) || isEmail
            }
        })
    }

    const passwordValidation = (e) => {
        const input = e.target;
        const key = input.name;
        const isRequired = validation(input); // calling...
        const isMinLength = minLength(input, 4); // calling...
        const isMaxLength = maxLength(input, 8); // calling...
        const isStrong = strongPassword(input); // calling...

        return setError((oldData) => {
            return {
                ...oldData,
                [key]:
                    (isRequired.state && isRequired) ||
                    (isStrong.state && isStrong) ||
                    (isMinLength.state && isMinLength) ||
                    isMaxLength
            }
        })
    }

    const mobileValidation = (e) => {
        const input = e.target;
        const key = input.name;
        const isRequired = validation(input); // calling...
        const isMinLength = minLength(input, 4); // calling...
        const isMaxLength = maxLength(input, 13); // calling...

        return setError((oldData) => {
            return {
                ...oldData,
                [key]:
                    (isRequired.state && isRequired) ||
                    (isMinLength.state && isMinLength) ||
                    isMaxLength
            }
        })
    }

    const validation = (input) => {
        const value = input.value.trim();

        if (value.length === 0) {
            return {
                state: true,
                message: "This field is required !"
            }
        }
        else {
            return {
                state: false,
                message: ""
            }
        }
    }

    const emailSyntax = (input) => {
        const value = input.value.trim();
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
        if (regexp.test(value)) {
            return {
                state: false,
                message: ""
            }
        }
        else {
            return {
                state: true,
                message: "This email is not valid !"
            }
        }
    }

    const strongPassword = (input) => {
        const value = input.value.trim();
        const regexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g;
        if (regexp.test(value)) {
            return {
                state: false,
                message: ""
            }
        }
        else {
            return {
                state: true,
                message: "Password should contain Uppercase, Lowercase, Numbers and symbols !"
            }
        }
    }

    const minLength = (input, requiredLength) => {
        const value = input.value.trim();
        if (value.length < requiredLength) {
            return {
                state: true,
                message: `Minimum ${requiredLength} characters required !`
            }
        }
        else {
            return {
                state: false,
                message: ""
            }
        }
    }

    const maxLength = (input, requiredLength) => {
        const value = input.value.trim();
        if (value.length > requiredLength) {
            return {
                state: true,
                message: `Maximum ${requiredLength} characters required`
            }
        }
        else {
            return {
                state: false,
                message: ""
            }
        }
    }

    const validateOnSubmit = () => {
        let valid = true;

        for (let key in input) {
            if (input[key].length === 0) {
                valid = false;
                setError((oldData) => {
                    return {
                        ...oldData,
                        [key]: {
                            state: true,
                            message: "This field is required !"
                        }
                    }
                })
            }
        }

        return valid;
    }

    const register = (e) => {
        e.preventDefault();
        const isValid = validateOnSubmit(); // calling...

        if (isValid) {
            return setRequest({
                method: 'GET',
                url: 'https://jsonplaceholder.typicode.com/posts'
            })
        }
    }

    const design = (
        <>
            {
                <Alert />
            }
            <Grid container>
                <Grid item sm={7} xs={12}>
                    <img src='images/signup-logo.png' width={'100%'} alt='signup-logo' />
                </Grid>
                <Grid item sm={5} xs={12}
                    sx={{
                        p: {
                            xs: 3,
                            sm: 5
                        }
                    }}
                >
                    <Typography variant='h4'
                        sx={{
                            mt: {
                                xs: 0,
                                sm: 3
                            },
                            mb: 5
                        }}>
                        Register
                    </Typography>
                    <form onSubmit={register}>
                        <Stack spacing={3}>
                            <TextField
                                label="Fullname"
                                name='fullname'
                                value={input.fullname}
                                error={error.fullname.state}
                                helperText={error.fullname.message}
                                onChange={updateValue}
                                onBlur={requiredValidation}
                                onInput={requiredValidation}
                            />
                            <TextField
                                type='tel'
                                label="Mobile"
                                name='mobile'
                                value={input.mobile}
                                error={error.mobile.state}
                                helperText={error.mobile.message}
                                onChange={updateValue}
                                onBlur={mobileValidation}
                                onInput={mobileValidation}
                            />
                            <TextField
                                type='email'
                                label="Email"
                                name='email'
                                value={input.email}
                                error={error.email.state}
                                helperText={error.email.message}
                                onChange={updateValue}
                                onBlur={emailValidation}
                                onInput={emailValidation}
                            />
                            <TextField
                                type='password'
                                label="password"
                                name='password'
                                value={input.password}
                                error={error.password.state}
                                helperText={error.password.message}
                                onChange={updateValue}
                                onBlur={passwordValidation}
                                onInput={passwordValidation}
                            />
                            <Stack
                                direction={'row'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                            >
                                <FormGroup>
                                    <FormControlLabel
                                        label="I Accept Terms & Conditions !"
                                        control={
                                            <Checkbox
                                                color='info'
                                                checked={checked}
                                                onClick={() => setChecked(!checked)}
                                            />
                                        }
                                    />
                                </FormGroup>
                                <Button>Already Have An Account !</Button>
                            </Stack>
                            <Button
                                type='submit'
                                variant='contained'
                                disabled={
                                    error.fullname.state ||
                                    error.mobile.state ||
                                    error.email.state ||
                                    error.password.state ||
                                    !checked
                                }
                            >Register</Button>
                        </Stack>
                    </form>
                </Grid>
            </Grid>
        </>
    );
    return design;
}

export default Signup;