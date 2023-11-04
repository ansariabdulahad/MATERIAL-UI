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
import { useState } from 'react';

const Forgot = () => {

    const [verifyForm, setVerifyForm] = useState(false);

    const design = (
        <>
            <Container>
                <Grid container>
                    <Grid item sm={6} xs={12}>One</Grid>
                    <Grid item sm={6} xs={12}>
                        <h1>Forgot Password</h1>
                        {
                            !verifyForm
                                ?
                                <form>
                                    <Stack spacing={3}>
                                        <TextField
                                            name='email'
                                            label='Email'
                                            variant='outlined'
                                        />
                                        <div align='center'>
                                            <LoadingButton
                                                variant='contained'
                                            >Sent OTP</LoadingButton>
                                        </div>
                                    </Stack>
                                </form>
                                :
                                <form>
                                    <Stack spacing={3}>
                                        <TextField
                                            name='verification-code'
                                            label='verification Code'
                                            variant='outlined'
                                        />
                                        <TextField
                                            name='password'
                                            label='New Password'
                                            variant='outlined'
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