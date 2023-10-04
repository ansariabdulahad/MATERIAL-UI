import { Button, Grid } from '@mui/material';

const GridPractice = () => {
    const design = (
        <>
            <Grid container>
                <Grid item lg="12" md="4" sm="6" xs="12" >
                    <Button variant='contained' color='success' sx={{ width: "100%" }}>Button 1</Button>
                </Grid>
                <Grid item lg="6" md="4" sm="6" xs="12" >
                    <Button variant='contained' color='warning' sx={{ width: "100%" }}>Button 2</Button>
                </Grid>
                <Grid item lg="6" md="4" sm="12" xs="12" >
                    <Button variant='contained' color='secondary' sx={{ width: "100%" }}>Button 3</Button>
                </Grid>
            </Grid>
        </>
    );
    return design;
}

export default GridPractice;