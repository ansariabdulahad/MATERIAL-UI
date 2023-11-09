import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { useState } from "react";
import Chart from 'react-apexcharts';

const Purchase = () => {

    const options = {
        labels: ['Laptop', 'Mobile', 'Watch', 'Desktop', 'Keyboard']
    };
    const [series, setSeries] = useState([
        234, 234, 546, 1324, 56
    ]);

    const design = (
        <>
            <Grid item sx={12} sm={4}>
                <Card>
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