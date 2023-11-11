import { Grid } from "@mui/material";
import Congratulation from "./Congratulation/Congratulation";
import Purchase from "./Purchase/Purchase";
import Revenue from "./Revenue/Revenue";
import TotalEarning from "./TotalEarning/TotalEarning";

const Modern = () => {
    const design = (
        <>
            <Grid container spacing={3}>
                <Congratulation />
                <TotalEarning />
                <Revenue />
                <Purchase />
            </Grid>
        </>
    );
    return design;
}

export default Modern;