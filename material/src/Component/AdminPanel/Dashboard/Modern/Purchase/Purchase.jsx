import './purchase.css'

import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { useState } from "react";
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const Purchase = () => {

    const { adminReducer } = useSelector(response => response);

    const options = {
        labels: ['Laptop', 'Mobile', 'Watch', 'Desktop', 'Keyboard']
    };
    const [series, setSeries] = useState([
        234, 234, 546, 1324, 56
    ]);

    const design = (
        <>
            <Grid item sx={12} sm={5}>
                <Card
                    sx={{
                        bgcolor: adminReducer.dark ? '#1e1e1e' : 'white'
                    }}
                >
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="h5"
                        >Purchase</Typography>
                        <Chart
                            type="pie"
                            options={options}
                            series={series}
                        />
                    </CardContent>
                </Card>
            </Grid>
        </>
    );
    return design;
}

export default Purchase;