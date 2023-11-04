import { Grid } from "@mui/material";
import Congratulation from "./Congratulation/Congratulation";
import Purchase from "./Purchase/Purchase";
import Revenue from "./Revenue/Revenue";

const Modern = () => {
    const design = (
        <>
            <Grid container spacing={3}>
                <Congratulation />
                <Purchase />
                <Revenue />
            </Grid>
        </>
    );
    return design;
}

export default Modern;