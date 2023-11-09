import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Chart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';

import { revenueRequest } from "./revenue.action";

const Revenue = () => {

    const dispatch = useDispatch();
    const response = useSelector(response => response);

    const [series, setSeries] = useState([
        {
            name: 'Profit',
            data: [50, 60, 20, 30, 55, 50]
        },
        {
            name: 'Loss',
            data: [25, 10, 10, 15, 50, 70]
        }
    ]);

    const [options, setOptions] = useState({
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
        },
        theme: {
            mode: 'light',
            palette: 'palette10'
        },
        // colors: ['#101641', '#e68d89'],
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            markers: {
                fillColors: ['red', 'cyan'],
                width: 20,
                height: 20
            }
        },
        chart: {
            toolbar: {
                show: true,
                tools: {
                    download: false,
                    zoom: false
                }
            },
            // background: 'black',
            animations: {
                speed: 1000,
                ease: 'linear'
            }
        },
        // markers: {
        //     size: [15, 10],
        //     colors: ['red', 'cyan'],
        //     shape: 'square',
        //     strokeWidth: 10,
        //     strokeColors: 'black'
        // },
        title: {
            text: 'Revenue',
            align: 'center',
            style: {
                fontSize: '21px',
                // color: 'cyan'
            }
        },
        subtitle: {
            text: 'Updates',
            align: 'center',
            style: {
                fontSize: '18px',
                color: 'grey'
            }
        }
    });

    const getRevenue = () => {
        return dispatch(revenueRequest());
    }

    useEffect(() => {
        getRevenue();
    }, [response]);

    const design = (
        <>
            <Grid item sx={12} sm={6}>
                <Card>
                    <CardContent>
                        <Chart
                            type="line"
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

export default Revenue;