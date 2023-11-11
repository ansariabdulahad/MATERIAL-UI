import './Notfound.css';

import { Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const Notfound = () => {

    const { adminReducer } = useSelector(response => response);

    const design = (
        <>
            <Stack
                className="body"
            >
                <Box className="not-found">
                    <h2 style={{
                        color: adminReducer.dark ? '#fff' : 'inherit'
                    }}><span>Oops!</span> Page not found.</h2>
                    <h1>404</h1>
                    <p style={{
                        color: adminReducer.dark ? '#fff' : 'inherit'
                    }}>We can't find the page you're looking for.</p>
                    <Link to='/admin-panel' className='link'>Go Back</Link>
                </Box>
            </Stack>
        </>
    );
    return design;
}

export default Notfound;