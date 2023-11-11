import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Chart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';

import { revenueRequest } from "./revenue.action";

const Revenue = () => {

    const dispatch = useDispatch();
    const { revenueReducer, adminReducer } = useSelector(response => response);

    const [series, setSeries] = useState([]);
    const [cat, setCat] = useState([]);

    const options = {
        xaxis: {
            categories: cat
        },
        chart: {
            toolbar: {
                show: true,
                tools: {
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: false,
                    reset: false
                }
            },
            animations: {
                speed: 1000,
                ease: 'linear'
            }
        },
        title: {
            text: 'Revenue',
            align: 'center',
            style: {
                fontSize: '21px',
                color: adminReducer.dark ? '#fff' : 'inherit'
            }
        },
        subtitle: {
            text: 'Updates',
            align: 'left',
            style: {
                fontSize: '18px',
                color: adminReducer.dark ? '#fff' : 'inherit'
            }
        },
        // theme: {
        //     mode: 'light',
        //     palette: 'palette10'
        // },
        // // colors: ['#101641', '#e68d89'],
        // legend: {
        //     show: true,
        //     position: 'bottom',
        //     horizontalAlign: 'center',
        //     fontSize: 20,
        //     fontWeight: 'bold',
        //     markers: {
        //         fillColors: ['red', 'cyan'],
        //         width: 20,
        //         height: 20
        //     }
        // },
        // // markers: {
        // //     size: [15, 10],
        // //     colors: ['red', 'cyan'],
        // //     shape: 'square',
        // //     strokeWidth: 10,
        // //     strokeColors: 'black'
        // // },
    };

    const getRevenue = () => {
        return dispatch(revenueRequest());
    }

    const setRevenue = () => {
        return (
            setSeries([
                {
                    name: 'Earning',
                    data: revenueReducer.data.earning
                },
                {
                    name: 'Expenses',
                    data: revenueReducer.data.expenses
                }
            ]),
            setCat(revenueReducer.data.months)
        );
    }

    useEffect(() => {
        if (revenueReducer.isLoading === null) {
            getRevenue();
        }
        if (revenueReducer.success) {
            setRevenue();
        }
    }, [revenueReducer]);

    const design = (
        <>
            <Grid item sx={12} sm={6}>
                <Card
                    sx={{
                        bgcolor: adminReducer.dark ? '#1e1e1e' : 'white'
                    }}
                >
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