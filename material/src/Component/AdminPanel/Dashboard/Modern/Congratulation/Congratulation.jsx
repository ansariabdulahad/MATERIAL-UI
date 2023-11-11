import './congratulation.css';

import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { useState } from "react";
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const Congratulation = () => {

    const { adminReducer } = useSelector(response => response);

    const options = {
        chart: {
            toolbar: {
                show: true,
                tools: {
                    download: false,
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: false,
                    reset: false
                }
            },
            sparkline: {
                enabled: true
            },
            animations: {
                speed: 1000,
                ease: 'linear'
            }
        },
        theme: {
            palette: 'palette2'
        },
        title: {
            text: '$120,000',
            style: {
                fontSize: '18px',
                color: adminReducer.dark ? '#fff' : 'inherit'
            }
        }
    };
    const [series, setSeries] = useState([
        {
            name: 'Earning',
            data: [234, 345, 1, 2, 34534, 345, 34, 234, 245, 32543, 45]
        }
    ]);

    const design = (
        <>
            <Grid item sx={12} sm={6}>
                <Card className='chart-box'
                    sx={{
                        bgcolor: adminReducer.dark ? '#1e1e1e' : 'white'
                    }}
                >
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="h5"
                        >Sales</Typography>
                        <Chart
                            className="chart"
                            type="area"
                            options={options}
                            series={series}
                            height={"160px"}
                        />
                    </CardContent>
                </Card>
            </Grid>
        </>
    );
    return design;
}

export default Congratulation;