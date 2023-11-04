import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";

const Revenue = () => {
    const design = (
        <>
            <Grid item sx={12} sm={3}>
                <Card>
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="h5"
                        >Lizard</Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            size="small"
                        >Share</Button>
                    </CardActions>
                </Card>
            </Grid>
        </>
    );
    return design;
}

export default Revenue;