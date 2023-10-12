import { Button, Checkbox, FormControlLabel, FormGroup, Grid, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {

    const signupForm = {
        fullname: "",
        mobile: "",
        email: "",
        password: ""
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

    const [input, setInput] = useState(signupForm);
    const [error, setError] = useState(signupFormValidation);

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

    const design = (
        <>
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
                    <form>
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
                                onBlur={requiredValidation}
                                onInput={requiredValidation}
                            />
                            <TextField
                                type='email'
                                label="Email"
                                name='email'
                                value={input.email}
                                error={error.email.state}
                                helperText={error.email.message}
                                onChange={updateValue}
                                onBlur={requiredValidation}
                                onInput={requiredValidation}
                            />
                            <TextField
                                type='password'
                                label="password"
                                name='password'
                                value={input.password}
                                error={error.password.state}
                                helperText={error.password.message}
                                onChange={updateValue}
                                onBlur={requiredValidation}
                                onInput={requiredValidation}
                            />
                            <Stack
                                direction={'row'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                            >
                                <FormGroup>
                                    <FormControlLabel
                                        label="I Accept Terms & Conditions !"
                                        control={<Checkbox color='info' />}
                                    />
                                </FormGroup>
                                <Button>Already Have An Account !</Button>
                            </Stack>
                            <Button
                                LinkComponent={Link}
                                to="login"
                                variant='contained'
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