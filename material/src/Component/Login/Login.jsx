import {
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    Stack,
    TextField
} from '@mui/material';
import {
    Link,
    useNavigate
} from 'react-router-dom';

// MAIN COMPONNENT OF LOGIN PAGE
const Login = () => {
    const navigate = useNavigate();

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
                    <Grid item sm="6" xs="12">One</Grid>
                    <Grid item sm="6" xs="12">
                        <h1>Login</h1>
                        <form onSubmit={login}>
                            <Stack direction={'column'} spacing={3}>
                                <TextField
                                    name='username'
                                    label='Username'
                                    variant='outlined'
                                />
                                <TextField
                                    name='password'
                                    label='Password'
                                    type='password'
                                    variant='outlined'
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