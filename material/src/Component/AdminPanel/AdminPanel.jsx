import { Container, Stack } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const AdminPanel = () => {
    const design = (
        <>
            <Container>
                <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    sx={{
                        backgroundColor: '#f5f5f5',
                    }}
                >
                    <h1>Testing...</h1>
                    <Stack
                        direction={"row"}
                        spacing={4}
                    >
                        <Link to='/admin-panel/dashboard'>Dashboard</Link>
                        <Link to='#'>Analytics</Link>
                        <Link to='#'>Contacts</Link>
                    </Stack>
                </Stack>
                <Outlet />
            </Container>
        </>
    );
    return design;
}

export default AdminPanel;