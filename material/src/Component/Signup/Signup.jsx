import { Button, Checkbox, FormControlLabel, FormGroup, Grid, Stack, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Signup = () => {

    const design = (
        <>
            <Grid container>
                <Grid item sm="7" xs="12">
                    <img src='images/signup-logo.png' width={'100%'} alt='signup-logo' />
                </Grid>
                <Grid item sm="5" xs="12"
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
                                sm: 5
                            },
                            mb: 5
                        }}>
                        Register
                    </Typography>
                    <form>
                        <Stack spacing={3}>
                            <TextField label="Fullname" />
                            <TextField type='tel' label="Mobile" />
                            <TextField type='email' label="Email" />
                            <TextField type='password' label="password" />
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